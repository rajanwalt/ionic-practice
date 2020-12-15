import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Observable, of, Subscription } from 'rxjs';
import { filter, flatMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectOrderList, selectCurrency } from './../../store/selectors';

enum DeliveryStatus  {
  Pending = "Pending",
  ReadyForDelivery = "ReadyForDelivery",
  DeliveredToCustomer = "DeliveredToCustomer"
}

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  orders$: Observable<any> = this._store.select(selectOrderList);
  order = null;
  orderSub : Subscription;
  currency$ = this._store.select(selectCurrency);
  deliveryStatus = DeliveryStatus
 
  
  constructor(private activatedRoute : ActivatedRoute, 
              private navCtrl: NavController,  
              private _store: Store<State>
               ) { }

  ngOnInit() {
    // let orderId = this.activatedRoute.snapshot.params.orderId;
    
  }

  call(phonenumber)  {
    if(phonenumber)  {
      window.open(`tel:${phonenumber}`, '_system')
    } 
  }

  goBack()  {
    this.navCtrl.back();
  }

  sendStatusMail(status)  {
    console.log("status", status);
  }

  ionViewDidEnter(){
    let orderId = this.activatedRoute.snapshot.params.id;

    this.orderSub = this.orders$.pipe(
      flatMap(items => items.filter( entry => orderId == entry.id)),
      // map(ListOfOrders.formatAPIArray)
    ).subscribe( order => {
        this.order = order
    })
  }

}
