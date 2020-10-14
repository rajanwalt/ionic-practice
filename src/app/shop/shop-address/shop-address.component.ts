import { Component, OnInit, SimpleChanges, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { selectShopDetails } from './../../store/selectors';
import { SetShopAddress } from './../../store/actions';
import { State } from './../../store/state';
import { Observable, Subscription } from 'rxjs';

import { Shop } from './../models';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shop-address',
  templateUrl: './shop-address.component.html',
  styleUrls: ['./shop-address.component.scss'],
})
export class ShopAddressComponent implements OnInit, OnDestroy {
  countries : Array<string> = [
    "India",
    "Dubai"
  ];
  cities : Array<string> = [
    "Chennai",
    "Thanjavur"
  ];

  @Input() shopDetails : any = null;
  
  shopAddressForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl("", [Validators.required]),
    street: new FormControl('', Validators.required)
  });

  // shopDetails$ : Observable<Shop> = this._store.select(selectShopDetails);
  // shopDetailsSub : Subscription;

  constructor( private router: Router, private _store: Store<State>, private modalController: ModalController) { }

  
  onSubmit()  {
    // this._store.dispatch(new SetShopAddress(this.shopAddressForm.value));
    
    // this.router.navigate(['/shop']);

    this.shopAddressForm.valid && this.modalController.dismiss(this.shopAddressForm.value);
  }

  onDismiss()  {
    this.modalController.dismiss(this.shopDetails);
  }

  

  ngOnInit() {
    
  }
  
  ionViewDidEnter()  {
    // this.shopDetailsSub = this.shopDetails$.subscribe( value => {
    //   if(value && value.country) {
    //     this.shopAddressForm.patchValue(value)
    //   }
    // })

    this.shopDetails && this.shopAddressForm.patchValue(this.shopDetails);
  }

  ngOnDestroy(): void {
    // if(this.shopDetailsSub)  {
    //   this.shopDetailsSub.unsubscribe();
    // }
  }


}
