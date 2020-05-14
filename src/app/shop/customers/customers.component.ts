import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { selectCustomers } from './../../store/selectors';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  isSerachActive : boolean =  false;
  
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
  onSearch(event)  {
    console.log(event.target.value);
  }
  onCancel()  {
    this.isSerachActive = false;
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
