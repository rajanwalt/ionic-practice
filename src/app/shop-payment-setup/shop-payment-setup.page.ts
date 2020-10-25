import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { NavController, IonSlides } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from './../store/state';
import { Logout } from './../store/actions';
import { Observable, Subscription } from 'rxjs';

import { selectShopDetails } from './../store/selectors';


@Component({
  selector: 'app-shop-payment-setup',
  templateUrl: './shop-payment-setup.page.html',
  styleUrls: ['./shop-payment-setup.page.scss'],
})
export class ShopPaymentSetupPage implements OnInit, AfterViewInit {
  
  @ViewChild('slider') private slider: IonSlides;

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

  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;
  

  goTo(url)  {
    this.navCtrl.navigateForward(url)
  }

  onLogout()  {
    this._store.dispatch(new Logout());
    this.navCtrl.navigateForward('/');
  }

  constructor(private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {
  }

 

  ionViewWillEnter()  {
    this.shopDetailsSub = this.shopDetails$.subscribe( shopDetails => {
      if(shopDetails)  {
        this.navCtrl.navigateForward('/main');
      }
      
      // console.log("slider ion", this.slider);
      // setTimeout(() => {
      //   this.slider.slideTo(1)
      // }, 5000);

    });
    
  }

 

  ngAfterViewInit() {
    // console.log("slider", this.slider);
  }

  ionViewWillLeave(){
    if(this.shopDetailsSub)  {
      this.shopDetailsSub.unsubscribe();
    }
  }

}
