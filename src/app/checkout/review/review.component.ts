import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectLastOrder } from './../../store/selectors';
import { Observable } from 'rxjs';

import { Cart } from './../../common/models';
import { ModalController } from '@ionic/angular';

import { DeliveryAddressModalComponent } from './../../common/delivery-address-modal/delivery-address-modal.component';
import { PaymentInfoModalComponent } from './../../common/payment-info-modal/payment-info-modal.component';
import {  OnUpdateCustomer } from './../../store/actions';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  isInValid = false;
  public order$: Observable<Cart> = this._store.select(selectLastOrder);

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
    return deliveryMethod.filter(data => data['status'] == 'selected').reduce(item => item)
  }

  total(order)  {
    let subTotal = this.subtotal(order.orderDetails);
    let delivaeryRate = this.deliveryRate(order.deliveryMethod);
    
    return subTotal + delivaeryRate['rate'];

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

  async onShowInfo({type, fee})  {
    
    const modal = await this.modalController.create({
      component: PaymentInfoModalComponent,
      componentProps: {
        type,
        fee
      },
      cssClass: 'modal-custom-class',
      
    });
    return await modal.present();
  }

  goTo()  {
    
  }

  constructor(private _store: Store<State>, private modalController: ModalController) { }

  ngOnInit() {}

}
