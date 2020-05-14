import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-tab',
  templateUrl: './store-tab.component.html',
  styleUrls: ['./store-tab.component.scss'],
})
export class StoreTabComponent implements OnInit {

  shopDetails$ = of({
    shopLogo : "",
    shopName : "Test",
    country: "India",
    city: "Chennai",
    street: "",
    totalWallet : 1200
  })

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

  constructor(private router: Router) { }

  ngOnInit() {}

}
