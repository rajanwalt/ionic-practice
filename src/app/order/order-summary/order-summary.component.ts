import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { State } from './../../store/state';
import { Order, OrderDetails, OrderSummary } from './../models';
import { selectOrders } from './../../store/selectors';
import { PostOrderSummary, SetOrder } from './../../store/actions';

import { SocialMediaSharingService } from './../../common';
import * as _ from 'underscore';
import { ModalController, NavController } from '@ionic/angular';

import {PaymentTypeModalComponent} from './../../common/payment-type-modal/payment-type-modal.component';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit {

  public orders$: Observable<Order> = this._store.select(selectOrders);
  public orders = null;
  public orderSub : Subscription;

  public updatedOrders = [];
  public subTotal;
  public isCheckoutLinkGenerated = false;
  
  public SOCIALMEDIA = {
    WHATSAPP : "whatsapp",
    MESSENGER : "messenger",
    SMS : "sms",
    COPY : "copy",
    MORE : "more"
  }

  public removeItem;
  
  paymentOption = null;

  calculateTotal()  {
    
    if(this.updatedOrders.length > 1)  {
      this.subTotal = this.updatedOrders.reduce((currentvalue, nextValue) => +currentvalue.price + +nextValue.price);
    }
    else  {
      this.subTotal = this.updatedOrders[0]['price'];
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


    this.calculateTotal()

  }

  onShare(appName)  {
      
    switch(appName)  {
      case this.SOCIALMEDIA.WHATSAPP : {
        break;
      }
      case this.SOCIALMEDIA.MESSENGER : {
        break;
      }
      case this.SOCIALMEDIA.SMS : {
        this.socialMediaSharingService.shareViaSMS(this.message, this.orders.phoneNumber);
        break;
      }
      case this.SOCIALMEDIA.COPY : {
        break;
      }
      default: {

      }
    }
  }

  get message()  {
    return "";
  }

  get name()  {
    return (this.orders && this.orders.firstName) ? `${this.orders.firstName}'s` : "";
  }

  onAddItems()  {
    this.router.navigate(['/order/add_item']);
  }

  onPostOrderSummary()  {
    const finalOrderSummary = { ...this.orders, totalAmount: this.subTotal, status: "CREATED"};
    finalOrderSummary.orderDetails = this.updatedOrders.splice(0);
    console.log(finalOrderSummary);
    console.log(OrderSummary.formatAPI(finalOrderSummary));
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
      if(results && results.orderDetails)  {
        this.updatedOrders = results.orderDetails.slice(0);
        this.calculateTotal();
      }
    });
  }

  goBack()  {
    this.navCtrl.navigateBack('/order');
  }

  async onShowPaymentTypeModal()  {
    
    const modal = await this.modalController.create({
      component: PaymentTypeModalComponent,
      cssClass: 'payment-modal-custom-class',
      
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    this.paymentOption = data;
  }


  constructor(private _store: Store<State>,
    private socialMediaSharingService: SocialMediaSharingService,
    private router: Router,
    private navCtrl: NavController,
    private modalController: ModalController) { }


}
