import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from './../store/state';
import { SetOrder } from './../store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  isSerachActive : boolean =  false;
  searchText: string = "";

  public customers$ = of([
    {
      id : 1,
      firstName : "Rajan",
      lastName : "Joseph",
      totalOrders : 0,
      totalAmount : 0
    },
    {
      id : 2,
      firstName : "First",
      lastName : "Last",
      totalOrders : 40,
      totalAmount : 100
    },
    {
      id : 3,
      firstName : "First",
      lastName : "Last",
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
    let customerId = customer['id'];
    
    this._store.dispatch(new SetOrder({customerId}));
    this.router.navigate(['/order/add_item']);
  }

  onAddCustomer()  {
    //Store selected Customer
  }

  constructor(private _store: Store<State>, private router: Router) { }

  ngOnInit() {
  }

}
