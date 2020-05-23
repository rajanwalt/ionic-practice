import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IonSearchbar } from '@ionic/angular';
import { of } from 'rxjs';

import { State } from './../../store/state';
import { SetOrder } from './../../store/actions';




@Component({
  selector: 'app-select-catalogue',
  templateUrl: './select-catalogue.component.html',
  styleUrls: ['./select-catalogue.component.scss'],
})
export class SelectCatalogueComponent implements OnInit {
  
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  public searchText: string = "";
  public isSerachActive : boolean =  false;
  public selectedItems : Array<any> = [
    
  ];
  
  public catelogue$ = of([
    {
      id : 1,
      url : "https://developer.apple.com/app-store/marketing/guidelines/images/thumbnail-iMac_2x.png",
      productName : "Test",
      price : "130",
      itemSold : "10"
    },
    {
      id : 2,
      url : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
      productName : "Test",
      price : "130",
      itemSold : "10"
    },
    {
      id : 3,
      url : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
      productName : "Test",
      price : "130",
      itemSold : "10"
    }
  ]);

  onAddItems()  {
    const orderDetails = this.selectedItems;
    this._store.dispatch(new SetOrder({orderDetails}));

    this.router.navigate(['/order/order_summary']);
  }

  onEnableSearch()  {
    this.isSerachActive = !this.isSerachActive;
    setTimeout(() => this.searchbar &&  this.searchbar.setFocus(), 500);
  }

  onSearch(event)  {
    this.searchText = event.target.value;
  }
  onCancel()  {
    this.isSerachActive = false;
    this.searchText = "";
  }
  
  onSelectItem(itemDetails)  {
    let {id, price, productName} = itemDetails;
    
    let isSelected = this.selectedItems.filter(items => items['id'] == id);
    

    if(Array.isArray(isSelected) && isSelected.length > 0)  {
      let removeExits = this.selectedItems.filter(items => items['id'] != id);
      this.selectedItems = removeExits;
    }
    else {
      this.selectedItems.push({id, price, productName, count: 1});
    }

  }

  constructor(private router: Router, private _store: Store<State>) { }

  ngOnInit() {}

}
