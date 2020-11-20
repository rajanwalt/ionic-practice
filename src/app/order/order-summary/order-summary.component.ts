import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { State } from './../../store/state';
import { Order, OrderDetails, OrderSummary } from './../models';
import { selectLastOrderID, selectOrders, selectSetting, selectUser } from './../../store/selectors';
import { PostOrderSummary, SetOrder, ResetOrderStatus, ResetOrder } from './../../store/actions';

import { SocialMediaSharingService } from './../../common';
import {  Cart } from './../../common/models';
import * as _ from 'underscore';
import { ModalController, NavController, AlertController } from '@ionic/angular';

import {PaymentTypeModalComponent} from './../../common/payment-type-modal/payment-type-modal.component';


@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {

  public orders$: Observable<Order> = this._store.select(selectOrders);
  public orderStatus$: Observable<Cart> = this._store.select(selectLastOrderID);
  user$: Observable<any> = this._store.select(selectUser)
  settings$: Observable<any> = this._store.select(state => selectSetting(selectUser(state)));

  
  public orders = null;
  public orderSub : Subscription;
  vat = 0;
  vatSub: Subscription;

  public updatedOrders = [];
  public subTotal;
  public deliveryCharge = 0;
  
  public SOCIALMEDIA = {
    WHATSAPP : "whatsapp",
    MESSENGER : "messenger",
    SMS : "sms",
    COPY : "copy",
    MORE : "more"
  }

  public removeItem;
  
  paymentOption = null;

  

  calculateSubTotal()  {
    
    if(this.updatedOrders.length > 1)  {
      // this.subTotal = this.updatedOrders.reduce((currentvalue, nextValue) => +currentvalue.price + +nextValue.price);
      this.subTotal = this.updatedOrders.reduce((accumulator, currentValue) => accumulator + (+currentValue.price * currentValue.count), 0 );
    }
    else if(this.updatedOrders.length == 1) {
      this.subTotal = +this.updatedOrders[0]['price'] * this.updatedOrders[0]['count'];
    }
    else {
      this.subTotal = 0;
    }
  
  }
   
  getCounterValue(orderDetails: OrderDetails)  {
    let {item_id, count} = orderDetails;

    let isOrderExit = _.findIndex(this.updatedOrders, {item_id});
    
    if(isOrderExit >= 0)  {
        if(count > 0)  {
          this.updatedOrders[isOrderExit] = {...orderDetails};
        }
        else {
          this.updatedOrders.splice(isOrderExit, 1);
          this._store.dispatch(new SetOrder({orderDetails: this.updatedOrders}));
        }
    }
    else {
      this.updatedOrders.push(orderDetails);
    }


    this.calculateSubTotal()

  }

  socialSharingCallback(status)  {
    status && this.goBack();
  }

  async onShare(appName, orderId='')  {
    
    let checkoutLink = `http://ec2-35-181-44-11.eu-west-3.compute.amazonaws.com:8080/checkout/${orderId}`;

    switch(appName)  {
      case this.SOCIALMEDIA.WHATSAPP : {
        const status = await this.socialMediaSharingService.shareViaWhatsApp(checkoutLink);
        this.socialSharingCallback(status);
        break;
      }
      case this.SOCIALMEDIA.MESSENGER : {
        break;
      }
      case this.SOCIALMEDIA.SMS : {
        const status = await this.socialMediaSharingService.shareViaSMS(checkoutLink, this.orders.phoneNumber);
        this.socialSharingCallback(status);
        break;
      }
      case this.SOCIALMEDIA.COPY : {
        break;
      }
      default: {
        const status = await this.socialMediaSharingService.share(checkoutLink, "Checkout Link");
        this.socialSharingCallback(status);
      }
    }
  }


  get name()  {
    return (this.orders && this.orders.firstName) ? `${this.orders.firstName}'s` : "";
  }

  get vatAmount()  {
    return this.vat ? ((this.subTotal * +this.vat)/100) :  this.vat
  }

  get total()  {
    return parseFloat(this.subTotal) + (+this.deliveryCharge) + (+this.vatAmount);
  }

  onAddItems()  {
    // this.router.navigate(['/order/add_item']);
    this.navCtrl.navigateForward('/order/add_item');
  }

  onPostOrderSummary()  {
    const finalOrderSummary = { ...this.orders, totalAmount: this.subTotal, status: "CREATED"};
    finalOrderSummary.orderDetails = JSON.parse(JSON.stringify(this.updatedOrders));
 
    this._store.dispatch(new PostOrderSummary(OrderSummary.formatAPI(finalOrderSummary)));
  }

  onSelectShipOptions()  {
    this.navCtrl.navigateForward('/order/shipment_options')
  }


  onselectPaymentType()  {

  }

  ngOnInit() {
    
  }

  ionViewWillEnter()  {
    this.orderSub =  this.orders$.subscribe((results) => {
      this.orders = {...results};
      if(results)  {
        if(results.orderDetails)  {
          this.updatedOrders = JSON.parse(JSON.stringify(results.orderDetails));
          this.calculateSubTotal();
        }

        if(results.shipmentOptions)  {
          this.deliveryCharge = results.shipmentOptions.charge;
        }
        
      }
    });

    this.vatSub = this.settings$.subscribe(data => {
      this.vat = data && data.length && data[0].vat;
    })


    this._store.dispatch(new ResetOrderStatus());
  }

  ionViewWillLeave(){
    if(this.orderSub)  {
      this.orderSub.unsubscribe();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      // header: 'Confirm!',
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        {
          text: "No, don't cancel it",
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, cancel it',
          handler: () => {
            this.goBack();
          }
        }
      ]
    });

    await alert.present();
  }

  goBack()  {
    this._store.dispatch(new ResetOrder(null));
    this.navCtrl.navigateBack('/main/new_order');
  }

  async onShowPaymentTypeModal()  {
    
    const modal = await this.modalController.create({
      component: PaymentTypeModalComponent,
      cssClass: 'payment-modal-custom-class'
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.paymentOption = data;
  }


  constructor(private _store: Store<State>,
    private socialMediaSharingService: SocialMediaSharingService,
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController,
    public alertController: AlertController) { }


}
