import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-shop-payment-setup',
  templateUrl: './shop-payment-setup.page.html',
  styleUrls: ['./shop-payment-setup.page.scss'],
})
export class ShopPaymentSetupPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    on: {
      beforeInit: function() {
        var overwriteParams = {
          spaceBetween: -30,
        };
        this.params = Object.assign(this.params, overwriteParams);
        this.originalParams = Object.assign(this.originalParams, overwriteParams);
      }
    }
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
