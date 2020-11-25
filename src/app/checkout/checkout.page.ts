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
import { CartComponent } from './../common/cart/cart.component';

import {  OnSelectPaymentMethod, OnUpdateCustomer, OnUpdateOrderItems } from './../store/actions';
import { GetFinalOrderSummary } from './../store/actions';

import { MonekatService } from './../APIs'



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

  vat(order)  {
    if(order['VAT'])  {
      let subTotal = this.subtotal(order.orderDetails);

      return this.subtotal(order.orderDetails) * (order['VAT'] / 100)
    }
    return 0;
  }

  total(order)  {
    let subTotal = this.subtotal(order.orderDetails);
    
    if(order['deliveryMethod'])  {
      let delivaeryRate = this.deliveryRate(order.deliveryMethod) ;
      return subTotal + delivaeryRate['rate'];
    }
    
    return subTotal
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
  
  async onShowOrders(orderDetails)  {
    
    const modal = await this.modalController.create({
      component: CartComponent,
      componentProps : {
        orderDetails
      }
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss();

    this._store.dispatch(new OnUpdateOrderItems(data));

  }

  onSubmit(order)  {

    let payload = {
      id : this.orderId,
      amount : this.total(order),
      fee : 10
    }

    this.checkoutLinkSub = this.monekatService.checkout(payload).subscribe( data => {
      let {RedirectURL} = data;

      window.open(RedirectURL, '_self'); 
    })
    

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
