import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router'
import { of, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { selectCustomers, selectShopDetails } from './../../store/selectors';
import { IonSearchbar } from '@ionic/angular';
import { GetCustomers } from 'src/app/store/actions';

@Component({
  selector: 'app-customer-tab',
  templateUrl: './customer-tab.component.html',
  styleUrls: ['./customer-tab.component.scss'],
})
export class CustomerTabComponent implements OnInit {

  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  
  isSerachActive : boolean =  false;
  searchText: string = "";

  activeTab : number = 0;

  tabs : string[] = [
    "RECENT",
    "ALL"
  ];

  public customers$ : Observable<any> = this._store.select(selectCustomers);
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;
   
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

  constructor(private router: Router, private _store: Store<State>) { }


  ionViewWillEnter(){
    this.shopDetailsSub = this.shopDetails$.subscribe(data => {
      if(data)  {
        this._store.dispatch(new GetCustomers({'service_id': data['id']}));
      }
    })
  }

  ionViewWillLeave(){
    if(this.shopDetailsSub)  {
      this.shopDetailsSub.unsubscribe();
    }
  }

  ngOnInit() {
    
  }

}
