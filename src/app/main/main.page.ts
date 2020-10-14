import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { selectShopDetails } from './../store/selectors';
import { State } from './../store/state';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;
  constructor(private _store: Store<State>, private navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter()  {
    this.shopDetailsSub = this.shopDetails$.subscribe( shopDetails => {
      if(!shopDetails)  {
        this.navCtrl.navigateForward('/shop-payment-setup');
      }
    });
  }

  ionViewWillLeave(){
    if(this.shopDetailsSub)  {
      this.shopDetailsSub.unsubscribe();
    }
  }

}
