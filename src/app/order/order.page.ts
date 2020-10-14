import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar, NavController } from '@ionic/angular';
import { of, Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from './../store/state';
import { SetOrder, ResetOrder, GetCustomers } from './../store/actions';
import { selectCurrentOrder, selectCustomers, selectShopDetails } from './../store/selectors';
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
  public selectedCustomer: Order = null;
  public customers$ : Observable<any> = this._store.select(selectCustomers);
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;
  // public customers$ = of([
  //   {
  //     customerId : 1,
  //     firstName : "Rajan",
  //     lastName : "Joseph",
  //     phoneNumber : "9698446776",
  //     totalOrders : 0,
  //     totalAmount : 0
  //   },
  //   {
  //     customerId : 2,
  //     firstName : "First",
  //     lastName : "Last",
  //     phoneNumber : "9698446776",
  //     totalOrders : 40,
  //     totalAmount : 100
  //   },
  //   {
  //     customerId : 3,
  //     firstName : "First",
  //     lastName : "Last",
  //     phoneNumber : "9698446776",
  //     totalOrders : 130,
  //     totalAmount : 1000
  //   }
  // ]);

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

  onselectCustomer({id:customerId, firstName, phoneNumber, service_id:serviceId, email, country, city, street })  {
    // const customerId = customer['id'];
    // const firstName = customer['firstName'];
    // const phoneNumber = customer['phoneNumber'];
    // const serviceId = customer['service_id']

    if(this.selectedCustomer && this.selectedCustomer.customerId == customerId && this.selectedCustomer.orderDetails && this.selectedCustomer.orderDetails.length > 0)  {
      this.navCtrl.navigateForward('/order/order_summary');
      this._store.dispatch(new SetOrder({customerId,serviceId, firstName, phoneNumber, email, country, city, street}));
    }
    else {
      this.navCtrl.navigateForward('/order/add_item');
      this._store.dispatch(new ResetOrder({customerId,serviceId, firstName, phoneNumber, email, country, city, street}));
    }
  }

 
  onAddNewCustomer() {
    this.router.navigate(['/order/add_customer']);
  }

  constructor(private _store: Store<State>, 
              private router: Router,
              private navCtrl: NavController ) { }

  ngOnInit() {
  }

  ionViewWillEnter()  {
    this.currentOrderSub = this.currentOrder$.subscribe(data => {
      this.IsCustomerAlreadySelected = (data && data.customerId) ? data.customerId : '' ;
      this.selectedCustomer = data ? {...data} : null ;
    });

    this.shopDetailsSub = this.shopDetails$.subscribe(data => {
      if(data)  {
        this._store.dispatch(new GetCustomers({'service_id': data['id']}));
      }
    })
  
  }

  ionViewWillLeave(){
    if(this.currentOrderSub)  {
      this.currentOrderSub.unsubscribe();
    }
    
    if(this.shopDetailsSub)  {
      this.shopDetailsSub.unsubscribe();
    }
  }

}
