import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Observable, of, combineLatest } from 'rxjs';
import { AddCustomRateModalComponent } from './../add-custom-rate-modal/add-custom-rate-modal.component';

import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectOrders, selectUser, shippingCharges } from './../../store/selectors';
import { SetOrder } from './../../store/actions';
import { Order } from './../models';


@Component({
  selector: 'app-shipment-options',
  templateUrl: './shipment-options.component.html',
  styleUrls: ['./shipment-options.component.scss'],
})
export class ShipmentOptionsComponent implements OnInit {

  public orders$: Observable<Order> = this._store.select(selectOrders);
  public shippingCharges$: Observable<any> = this._store.select(state => shippingCharges(selectUser(state)));

  inHouseDelivery$: Observable<any> = combineLatest(
    this.orders$, 
    this.shippingCharges$,
    (order, shippingCharges) => {
      if(shippingCharges && shippingCharges.length && order['city'])  {
        return null;
      }
      else {
        let charge = shippingCharges.filter( data => data['city'] == order['city']);
        if(charge && charge.legth)  {
          return {
            type : "In-house Delivery",
            charge : charge[0]['charge']
          }
        }
        return null;
      }
    })

  
  defaultShipmentOption = {
    type : "Customer Pickup",
    charge : "0"
  };

  selectedShipmentOptions = null;

  onSelectShipmentOptions(event)  {
    this.selectedShipmentOptions = event.detail.value;
    
    this._store.dispatch(new SetOrder({shipmentOptions : this.selectedShipmentOptions}))
    this.goBack();
  }


  goBack()  {
    this.navCtrl.back();
  }

  async onShowDeliveryRateModal()  {
    const modal = await this.modalController.create({
      component: AddCustomRateModalComponent,
      cssClass: 'delivery-rate-modal-custom-class',
      
    });
    await modal.present();

    const { data : shipmentOptions } = await modal.onWillDismiss();
    
    if(shipmentOptions) {
      this._store.dispatch(new SetOrder({shipmentOptions}))
      this.goBack();
    }
  }

  onEditCustomer()  {
    this.navCtrl.navigateForward('/shop/add_customer')
  }

  constructor(
    private navCtrl: NavController, 
    public modalController: ModalController,
    private _store: Store<State>) { }

  ngOnInit() {}

}
