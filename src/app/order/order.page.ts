import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, NavController } from '@ionic/angular';
import { of, Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from './../store/state';
import { SetOrder } from './../store/actions';
import { selectCurrentOrder } from './../store/selectors';
import { Router } from '@angular/router';
import { Order } from './models';


@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  isSerachActive : boolean =  false;
  searchText: string = "";
  public currentOrder$ : Observable<Order> = this._store.select(selectCurrentOrder);
  public currentOrderSub : Subscription;
  public IsCustomerAlreadySelected = '';

  public customers$ = of([
    {
      customerId : 1,
      firstName : "Rajan",
      lastName : "Joseph",
      phoneNumber : "9698446776",
      totalOrders : 0,
      totalAmount : 0
    },
    {
      customerId : 2,
      firstName : "First",
      lastName : "Last",
      phoneNumber : "9698446776",
      totalOrders : 40,
      totalAmount : 100
    },
    {
      customerId : 3,
      firstName : "First",
      lastName : "Last",
      phoneNumber : "9698446776",
      totalOrders : 130,
      totalAmount : 1000
    }
  ]);

  onEnableSearch()  {
    this.isSerachActive = !this.isSerachActive;
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
  
  
  onSkip()  {

  }

  onselectCustomer(customer: any)  {
    const customerId = customer['customerId'];
    const firstName = customer['firstName'];
    const phoneNumber = customer['phoneNumber'];

    if(this.IsCustomerAlreadySelected == customerId)  {
      this.navCtrl.navigateForward('/order/order_summary');
      this._store.dispatch(new SetOrder({customerId, firstName, phoneNumber}));
    }
    else {
      this.navCtrl.navigateForward('/order/add_item');
      this._store.dispatch(new SetOrder({customerId, firstName, phoneNumber}));
    }
  }

  onAddCustomer()  {
    //Store selected Customer
  }

  constructor(private _store: Store<State>, 
              private router: Router,
              private navCtrl: NavController ) { }

  ngOnInit() {
  }

  ionViewDidEnter()  {
    this.currentOrderSub = this.currentOrder$.subscribe(data => {
      this.IsCustomerAlreadySelected = (data && data.customerId) ? data.customerId : '' ;
    });
  
  }

}
