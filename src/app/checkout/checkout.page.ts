import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription, Observable, from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { State } from './../store/state';

import { selectLastOrder } from './../store/selectors';

import { Cart } from './../common/models';

import { DeliveryAddressModalComponent } from './../common/delivery-address-modal/delivery-address-modal.component';
import { PaymentTypeModalComponent } from './../common/payment-type-modal/payment-type-modal.component';
import { RefundExchangePolicyComponent } from './../common/refund-exchange-policy/refund-exchange-policy.component';
import { CartComponent } from './../common/cart/cart.component';

import {  OnSelectPaymentMethod, OnUpdateCustomer, OnUpdateOrderItems } from './../store/actions';
import { GetFinalOrderSummary } from './../store/actions';

import { MonekatService } from './../APIs'
import { hostName } from './../common/hostname';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, OnDestroy {

  isInValid = false;
  public order$: Observable<Cart> = this._store.select(selectLastOrder);
  checkoutLinkSub : Subscription;
  orderId; 
 
  subtotal(orderDetails)  {
    if(orderDetails && orderDetails.length)  {
      let result = 0;
      orderDetails.forEach(value => {
        result += value['count'] * value['price']
      });

      return result;
    }
    return 0;
  }

  deliveryRate(deliveryMethod = [])  {
    if(!deliveryMethod.length)  {
      return null
    }
    else {
      let selected =  deliveryMethod.filter(data => data['status'] == 'selected');
      return selected.length ? selected[0] : null
    }
      
  }

  getCurrencyCode(order)  {
    return (order && order.service && order.service.user && order.service.user.currencycode) ? order.service.user.currencycode : 'USD'
  }

  vat(order)  {
    if(order && order['vat'])  {
      return this.subtotal(order.orderDetails) * (order['vat'] / 100)
    }
    return 0;
  }

  total(order)  {
    let subTotal = this.subtotal(order.orderDetails);
    
    // if(order['deliveryMethod'])  {
    //   let delivaeryRate = this.deliveryRate(order.deliveryMethod) ;
      let vat = this.vat(order)
      let shippingCharge = (order && order.shippingcharge) ? +order.shippingcharge : 0
      return subTotal + vat + shippingCharge;
    // }
    
    // return subTotal
  }

  async onShowAddresseModal(customerDetails=null)  {
    
    const modal = await this.modalController.create({
      component: DeliveryAddressModalComponent,
      componentProps : {
        "deliveryAddress" : customerDetails
      },
      cssClass: 'payment-modal-custom-class',
      
    });

    await modal.present();

    const { data : customer} = await modal.onWillDismiss();
    
    this._store.dispatch(new OnUpdateCustomer({customer}))
  }

  async onShowPaymentType()  {
    
    const modal = await this.modalController.create({
      component: PaymentTypeModalComponent
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss();

    this._store.dispatch(new OnSelectPaymentMethod(data));

  }

  async showExchangePolicy(policy = '')  {
    const modal = await this.modalController.create({
      component: RefundExchangePolicyComponent,
      componentProps: {
        policy
      }
    });

    await modal.present();
    await modal.onWillDismiss();

  }
  
  async onShowOrders(orderDetails, currencyCode='USD')  {
    
    const modal = await this.modalController.create({
      component: CartComponent,
      componentProps : {
        orderDetails,
        currencyCode
      }
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss();

    this._store.dispatch(new OnUpdateOrderItems(data));

  }

  onSubmit(order)  {

    let payload = {
      id : this.orderId,
      amount : this.total(order).toFixed(2),
      fee : (this.total(order) * 0.05).toFixed(2)
    }

    this.checkoutLinkSub = this.monekatService.checkout(payload).subscribe( data => {
      let {RedirectURL} = data;

      RedirectURL && window.open(RedirectURL, '_self'); 
    })
    

  }

  imageURL(itemImages=[])  {
    if(itemImages && itemImages.length)  {
      
      let filename = itemImages[itemImages.length - 1]['filename'];

      return `${hostName}/api/services/downloadfile/${filename}`
    }
    
    return '';
  }

  itemText(count = 0)  {
    if(count)  {
      return count > 1 ? `${count} Items in Cart` : `${count} Item in Cart` 
    } 
    return ''
  }

  constructor(private router: Router, 
              private activatedRoute : ActivatedRoute, 
              private _store: Store<State>, 
              private modalController: ModalController,
              private monekatService: MonekatService) { 

  

  }


  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.params.orderId;
    
    this._store.dispatch(new GetFinalOrderSummary({orderId : this.orderId}));

    
  }

  
  ngOnDestroy()  {
    if(this.checkoutLinkSub)  {
      this.checkoutLinkSub.unsubscribe();
    }
  }

 
}
