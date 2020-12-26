import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import {PaymentInfoModalComponent} from './../../common/payment-info-modal/payment-info-modal.component'
import { selectPaymentMethods } from './../../store/selectors';
import { GetPaymentMethods, UpdatePaymentMethods } from './../../store/actions';

@Component({
  selector: 'app-payment-settings',
  templateUrl: './payment-settings.component.html',
  styleUrls: ['./payment-settings.component.scss'],
})
export class PaymentSettingsComponent implements OnInit {

  paymentMethods$ = of([
    {
      "id" : 1,
      "type" : "card",
      "fee" : "5",
      "selected" : true
     },
    //  {
    //    "id": 2,
    //    "type" : "Cash on delivery",
    //    "fee" : "4.0",
    //    "selected" : true
    //  }
  ]);

  // paymentMethods$ = this._store.select(selectPaymentMethods);
  
  goBack()  {
    this.navCtrl.back();
  }

  onSelectPaymentMethod(event, paymentMethod)  {

    this._store.dispatch(new UpdatePaymentMethods(paymentMethod));
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
  constructor(public modalController: ModalController, 
    private navCtrl: NavController,
    private _store: Store<State>) { }

  ionViewDidEnter()  {
    // this._store.dispatch(new GetPaymentMethods({}))
  }

  ngOnInit() {}

}
