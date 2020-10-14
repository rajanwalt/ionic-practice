import { Component, OnInit, ViewChild } from '@angular/core';
import { of, Observable, Subscription } from 'rxjs';
import { Router} from '@angular/router'
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { selectCatalogue, selectShopDetails } from './../../store/selectors';
import { IonSearchbar } from '@ionic/angular';
import { GetCatalogue } from 'src/app/store/actions';
@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit {
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  public catelogue$ : Observable<any> = this._store.select(selectCatalogue);
  public searchText: string = "";
  // public catelogue$ = 
  
  // of([
  //   {
  //     id : 1,
  //     url : "https://developer.apple.com/app-store/marketing/guidelines/images/thumbnail-iMac_2x.png",
  //     productName : "Test",
  //     price : "130",
  //     itemSold : "10"
  //   },
  //   {
  //     id : 2,
  //     url : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
  //     productName : "Test",
  //     price : "130",
  //     itemSold : "10"
  //   },
  //   {
  //     id : 3,
  //     url : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y",
  //     productName : "Test",
  //     price : "130",
  //     itemSold : "10"
  //   }
  // ]);
  isSerachActive : boolean =  false;
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;

  onAddItem()  {
    this.router.navigate(['/shop/add_catalogue_item']);
  }

  onEnableSearch()  {
    setTimeout(() => this.searchbar &&  this.searchbar.setFocus(), 500);
  }

  onSearch(event)  {
    this.searchText = event.target.value;
  }
  onCancel()  {
    this.isSerachActive = false;
    this.searchText = "";
  }
  
  onViewItem(itemDetails)  {
    const itemId = itemDetails['id'];
    this.router.navigate(['/shop/view_catalogue_item'], { queryParams: {id : itemId }});
  }
  
  
  constructor(private router: Router, private _store: Store<State>) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.shopDetailsSub = this.shopDetails$.subscribe(data => {
      if(data)  {
        this._store.dispatch(new GetCatalogue({'service_id': data['id']}));
      }
    })
  }

  ionViewWillLeave(){
    if(this.shopDetailsSub)  {
      this.shopDetailsSub.unsubscribe();
    }
  }

}
