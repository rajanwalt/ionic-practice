import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, NavController } from '@ionic/angular';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectOrderList, selectUser } from './../../store/selectors';
import { GetOrderList } from './../../store/actions';

import { ListOfOrders } from './../models'

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.scss'],
})
export class OrdersTabComponent implements OnInit {

  @ViewChild('searchbar') searchbar: IonSearchbar;

  user$: Observable<any> = this._store.select(selectUser);
  orders$: Observable<any> = this._store.select(selectOrderList).pipe(map(ListOfOrders.formatAPIArray));
  shopDetailsSub: Subscription;

  isSerachActive : boolean =  false;
  searchText: string = "";

  // public orders$ : Observable<any> = of([
  //   {
  //     id: 1234,
  //     name : "test user",
  //     orderTotal : 150,
  //     paymentType: "Credit Card",
  //     paymentStatus : "Pending",
  //     orderStatus : "Pending",
  //     orderDate : "2020-03-25"
  //   },
  //   {
  //     id: 1034,
  //     name : "test user",
  //     orderTotal : 150,
  //     paymentType: "Credit Card",
  //     paymentStatus : "Pending",
  //     orderStatus : "Pending",
  //     orderDate : "2020-03-25"
  //   },
  //   {
  //     id: 1294,
  //     name : "test user",
  //     orderTotal : 150,
  //     paymentType: "Credit Card",
  //     paymentStatus : "Pending",
  //     orderStatus : "Pending",
  //     orderDate : "2020-03-25"
  //   },
  //   {
  //     id: 134,
  //     name : "test user2",
  //     orderTotal : 1500,
  //     paymentType: "Credit Card",
  //     paymentStatus : "Pending",
  //     orderStatus : "Pending",
  //     orderDate : "2020-09-25"
  //   }
  // ]);

  getGroupBy(order)  {
    return order &&  (_.groupBy(order, "orderDate"))
  }

  onEnableSearch()  {
    setTimeout(() => this.searchbar &&  this.searchbar.setFocus(), 500);
  }

  onSearch(event)  {
    let searchText = event.target.value;
    this.searchText = searchText;
  }
  onCancel()  {
    this.isSerachActive = false;
    this.searchText = "";
  }

  onViewOrder(item)  {
    const {id} = item;

    this.navCtrl.navigateForward(`/order/${id}`)
  }

  onCreateNewOrder()  {
    this.navCtrl.navigateForward('/order')
  }

  
  constructor(private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.shopDetailsSub = this.user$.subscribe(details => {
      let service = details['services'][0];
      this._store.dispatch(new GetOrderList(service['id']));
    })
  }

  ionViewDidLeave(){
    if(this.shopDetailsSub)  {
      this.shopDetailsSub.unsubscribe();
    }
  }
}
