import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { selectLastOrder } from './../../store/selectors';

import { Cart } from './../../order/models';
import { OnSelectPaymentMethod } from './../../store/actions';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  
  public order$: Observable<Cart> = this._store.select(selectLastOrder);
 
  selectedPaymentType = null;

  onSelectPaymentType(event)  {
    this.selectedPaymentType = event.detail.value;
  }

  goTo()  {
    this._store.dispatch(new OnSelectPaymentMethod(this.selectedPaymentType));

    this.navCtrl.navigateForward('/checkout/review')
  }

  constructor( private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {}

}
