import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectLastOrder } from './../../store/selectors';

import { from, Observable } from 'rxjs';
import { Cart } from './../../order/models';
import { ModalController, NavController } from '@ionic/angular';

import { DeliveryAddressModalComponent } from './../../common/delivery-address-modal/delivery-address-modal.component';
import { OnSelectDeliveryMethod, OnUpdateCustomer } from './../../store/actions';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent implements OnInit {

  public order$: Observable<Cart> = this._store.select(selectLastOrder);
  selectedDeliveryMethod = null;

  onSelectDeliveryMethod(event)  {
    console.log(event.detail.value)
    this.selectedDeliveryMethod = event.detail.value;
  }

  goTo()  {
    this._store.dispatch(new OnSelectDeliveryMethod(this.selectedDeliveryMethod));

    this.navCtrl.navigateForward('/checkout/payment');
  }

  async onShowAddresseModal()  {
    
    const modal = await this.modalController.create({
      component: DeliveryAddressModalComponent,
      cssClass: 'payment-modal-custom-class',
      
    });

    await modal.present();

    const { data : customer} = await modal.onWillDismiss();
    
    this._store.dispatch(new OnUpdateCustomer({customer}))
  }


  constructor(private _store: Store<State>, private navCtrl: NavController, private modalController: ModalController) { }

  ngOnInit() {}

}
