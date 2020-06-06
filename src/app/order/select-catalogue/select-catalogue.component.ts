import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IonSearchbar, NavController } from '@ionic/angular';
import { of, combineLatest, Observable, BehaviorSubject } from 'rxjs';

import { State } from './../../store/state';
import { SetOrder, AddOrderDetails } from './../../store/actions';
import { selectCurrentOrder } from './../../store/selectors';
import { Order } from './../models';


@Component({
  selector: 'app-select-catalogue',
  templateUrl: './select-catalogue.component.html',
  styleUrls: ['./select-catalogue.component.scss'],
})
export class SelectCatalogueComponent implements OnInit {
  
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;
  public searchText: string = "";
  public isSerachActive : boolean =  false;
  public selectedItems : Array<any> = [];
  public currentOrder$ : Observable<Order> = this._store.select(selectCurrentOrder);
  public catelogue$ = of([
    {
      item_id : 1,
      url : "https://developer.apple.com/app-store/marketing/guidelines/images/thumbnail-iMac_2x.png",
      productName : "Test",
      price : 130,
      itemSold : 10
    },
    {
      item_id : 2,
      url : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
      productName : "Test",
      price : 130,
      itemSold : 10
    },
    {
      item_id : 3,
      url : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
      productName : "Test",
      price : 130,
      itemSold : 10
    }
  ]);

  public listofItems$ : Observable<any>;
  public existingCustomerId : string = '';

  onSubmitItems()  {
    const orderDetails = this.selectedItems;

    if(orderDetails.length > 0)  {
      this._store.dispatch(new AddOrderDetails({orderDetails}));

      this.router.navigate(['/order/order_summary']);
    }
    
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
    let {item_id, price, productName} = itemDetails;
    
    let isSelected = this.selectedItems.filter(items => items['item_id'] == item_id);
    

    if(Array.isArray(isSelected) && isSelected.length > 0)  {
      let removeExits = this.selectedItems.filter(items => items['id'] != item_id);
      this.selectedItems = removeExits;
    }
    else {
      this.selectedItems.push({item_id, price, productName, count: 1});
    }

    console.log("selectedItems", this.selectedItems);
  }

  onAddNewItem()  {
    this.router.navigate(['/order/add_new_item'])
  }

  filterSelectedItems(original, recentlySelected : Order)  {
    if(!(recentlySelected == null) && recentlySelected.orderDetails && this.existingCustomerId == recentlySelected.customerId)  {
      const selectedItemsId =  recentlySelected.orderDetails.map(items => items.item_id);
      console.log("selectedItemsId", selectedItemsId);

      return original.filter(originalItems => !selectedItemsId.some(selectedItems => originalItems['item_id'] == selectedItems))
    }
    
    this.existingCustomerId = recentlySelected && recentlySelected.customerId;

    return original;

  }

  goBack()  {
    this.navCtrl.back();
  }

  constructor(private router: Router, 
              private _store: Store<State>,
              private navCtrl: NavController) { }

  ngOnInit() {
    
  }

  ionViewDidEnter()  {
    this.listofItems$ = combineLatest(this.catelogue$, 
      this.currentOrder$, 
      (listofItem, listofSelectedItems) => this.filterSelectedItems(listofItem, listofSelectedItems));
    this.selectedItems = [];
  }

}
