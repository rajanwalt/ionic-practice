import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IonSearchbar, NavController } from '@ionic/angular';
import { of, combineLatest, Observable, BehaviorSubject, Subscription } from 'rxjs';

import { State } from './../../store/state';
import { SetOrder, AddOrderDetails, GetCatalogue } from './../../store/actions';
import { selectCurrentOrder, selectCatalogue, selectShopDetails, selectCurrency } from './../../store/selectors';
import { Order } from './../models';
import { RouterStateService } from './../../common';
import { hostName } from './../../common/hostname';

@Component({
  selector: 'app-select-catalogue',
  templateUrl: './select-catalogue.component.html',
  styleUrls: ['./select-catalogue.component.scss'],
})
export class SelectCatalogueComponent implements OnInit {
  
  @ViewChild('searchbar') searchbar: IonSearchbar;
  public searchText: string = "";
  public isSerachActive : boolean =  false;
  public selectedItems : Array<any> = [];
  public currentOrder$ : Observable<Order> = this._store.select(selectCurrentOrder);
  public catelogue$ : Observable<any> = this._store.select(selectCatalogue);
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;
  currency$ = this._store.select(selectCurrency);
  


  public listofItems$ : Observable<any>;
  // public existingCustomerId : string = '';
  previousRoute: string;

  onSubmitItems()  {
    let orderDetails = this.selectedItems;

    if(orderDetails.length > 0)  {
      orderDetails.forEach(order => order['item_id'] = order['id'] )
      this._store.dispatch(new AddOrderDetails({orderDetails}));

      this.navCtrl.navigateForward('/order/order_summary');
    }
    
  }

  imageURL(itemImages=[])  {
    if(itemImages && itemImages.length)  {
      
      let filename = itemImages[itemImages.length - 1]['filename'];

      return `${hostName}/api/services/downloadfile/${filename}`
    }
    
    return '';
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

    if(original)  {
      // if(!(recentlySelected == null) && recentlySelected.orderDetails && this.existingCustomerId == recentlySelected.customerId)  {
      if( recentlySelected && recentlySelected.orderDetails)  {

        const selectedItemsId =  recentlySelected.orderDetails.map(items => items.item_id);
  
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
