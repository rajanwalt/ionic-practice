import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IonSearchbar, NavController } from '@ionic/angular';
import { of, combineLatest, Observable, BehaviorSubject, Subscription } from 'rxjs';

import { State } from './../../store/state';
import { SetOrder, AddOrderDetails, GetCatalogue } from './../../store/actions';
import { selectCurrentOrder, selectCatalogue, selectShopDetails } from './../../store/selectors';
import { Order } from './../models';
import { RouterStateService } from './../../common';

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
  public catelogue$ : Observable<any> = this._store.select(selectCatalogue);
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;
  
  // public catelogue$ = of([
  //   {
  //     item_id : 1,
  //     url : "https://developer.apple.com/app-store/marketing/guidelines/images/thumbnail-iMac_2x.png",
  //     productName : "Test",
  //     price : 130,
  //     itemSold : 10
  //   },
  //   {
  //     item_id : 2,
  //     url : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
  //     productName : "Test",
  //     price : 130,
  //     itemSold : 10
  //   },
  //   {
  //     item_id : 3,
  //     url : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
  //     productName : "Test",
  //     price : 130,
  //     itemSold : 10
  //   }
  // ]);

  public listofItems$ : Observable<any>;
  // public existingCustomerId : string = '';
  previousRoute: string;

  onSubmitItems()  {
    let orderDetails = this.selectedItems;
    console.log("submit orderDetails", orderDetails);

    if(orderDetails.length > 0)  {
      orderDetails.forEach(order => order['item_id'] = order['id'] )
      this._store.dispatch(new AddOrderDetails({orderDetails}));

      this.navCtrl.navigateForward('/order/order_summary');
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
    let {id, price, productName} = itemDetails;
    
    let isSelected = this.selectedItems.filter(items => items['id'] == id);
    

    if(Array.isArray(isSelected) && isSelected.length > 0)  {
      let removeExits = this.selectedItems.filter(items => items['id'] != id);
      this.selectedItems = removeExits;
    }
    else {
      this.selectedItems.push({id, price, productName, count: 1});
    }

    console.log("selectedItems", this.selectedItems);
  }

  onAddNewItem()  {
    this.navCtrl.navigateForward('/order/add_new_item')
  }

  filterSelectedItems(original, recentlySelected : Order)  {
    console.log("recentlySelected", recentlySelected)
    console.log("original", original)

    if(original)  {
      // if(!(recentlySelected == null) && recentlySelected.orderDetails && this.existingCustomerId == recentlySelected.customerId)  {
      if( recentlySelected && recentlySelected.orderDetails)  {

        const selectedItemsId =  recentlySelected.orderDetails.map(items => items.item_id);
        console.log("selectedItemsId", selectedItemsId);
  
        return original.filter(originalItems => !selectedItemsId.some(selectedItems => originalItems['id'] == selectedItems))
      }

      // this.existingCustomerId = recentlySelected && recentlySelected.customerId;

      return original;
    }
   
    return [];

  }

  goBack()  {
    if(this.previousRoute.indexOf('add_new_item') >= 0)  {
      this.navCtrl.navigateBack('/order');
    }
    else {
      this.navCtrl.back();
    }
  }

  constructor(private router: Router, 
              private _store: Store<State>,
              private navCtrl: NavController,
              private routerStateService: RouterStateService) { }

  ngOnInit() {
    this.previousRoute = this.routerStateService.getPreviousUrl();
  }

  ionViewDidEnter()  {
    this.previousRoute = this.routerStateService.getPreviousUrl();
    
    this.listofItems$ = combineLatest(this.catelogue$, 
      this.currentOrder$, 
      (listofItem, listofSelectedItems) => this.filterSelectedItems(listofItem, listofSelectedItems));
    this.selectedItems = [];
  }

  ionViewWillEnter(){
    this.shopDetailsSub = this.shopDetails$.subscribe(data => {
      if(data)  {
        this._store.dispatch(new GetCatalogue({'service_id': data['id']}));
      }
    })
  }

}
