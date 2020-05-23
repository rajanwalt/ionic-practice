import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router'
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { selectCustomers } from './../../store/selectors';
import { IonSearchbar } from '@ionic/angular';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  
  isSerachActive : boolean =  false;
  searchText: string = "";

  activeTab : number = 0;

  tabs : string[] = [
    "RECENT",
    "ALL"
  ];

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

  public customers1$ : Observable<any> = this._store.select(selectCustomers);
   
  onActivateTab(activeIndex : number)  {
    this.activeTab = activeIndex;
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
  
  onViewCustomer(customer: any)  {
    const customerID = customer['id'];
    this.router.navigate(['/shop/add_customer'], { queryParams: {id : customerID }});
  }

  onAddCustomer() {
    this.router.navigate(['/shop/add_customer'], { queryParams: {id : '' }});
  }

  constructor(private router: Router,
    private _store: Store<State>) { }


  ngOnInit() {}

  
}
