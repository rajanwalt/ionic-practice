import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { selectShopDetails, selectUser } from './../../store/selectors';
import { GetShop } from 'src/app/store/actions';
import { hostName } from './../../common/hostname';

@Component({
  selector: 'app-store-tab',
  templateUrl: './store-tab.component.html',
  styleUrls: ['./store-tab.component.scss'],
})
export class StoreTabComponent implements OnInit {

  // shopDetails$ = of({
  //   shopLogo : "",
  //   shopName : "Test",
  //   country: "India",
  //   city: "Chennai",
  //   street: "",
  //   totalWallet : 1200
  // })
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  user$: Observable<any> = this._store.select(selectUser);
  // hostName = hostName;

  shopDetailsSub: Subscription;

  getShopLogo(shopImages=[])  {
    if(shopImages && shopImages.length)  {
      let filename = shopImages[shopImages.length - 1]['filename'];

      return `${hostName}/api/services/downloadfile/${filename}`
    }
   
    return '';
  }

  onSelect(selectedItem : string)  {
    switch(selectedItem)  {
      case 'shop': {
        this.router.navigate(['/shop'], { queryParams: {type : 'edit' }});
        break;
      }
      case 'wallet': {
        this.router.navigate(['/shop/my_wallet']);
        break;
      }
      case 'customers': {
        this.router.navigate(['/shop/customers']);
        break;
      }
      case 'catalogue': {
        this.router.navigate(['/shop/catalogue']);
        break;
      }
      default: {
        //Do nothing
        break;
      }

    }
  }

  constructor(private router: Router, private _store: Store<State>) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.shopDetailsSub = this.user$.subscribe(details => {
      let service = details['services'][0];
      this._store.dispatch(new GetShop(service['id']));
    })
  }

  ionViewDidLeave(){
    if(this.shopDetailsSub)  {
      this.shopDetailsSub.unsubscribe();
    }
  }

}
