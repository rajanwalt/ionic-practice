import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { selectShopDetails } from './../../store/selectors';

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

}
