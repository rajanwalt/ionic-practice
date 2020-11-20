import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { combineLatest, forkJoin, Observable, of, Subscription } from 'rxjs';

import { FormArray, FormGroup,  FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { GetShippingCharges, PostShippingCharges } from './../../store/actions';
import {selectSettings, selectShippingCharges, selectShopDetails, selectUser} from './../../store/selectors';
import { counries, cities } from './../../common/countries_cities';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  shippingSub : Subscription;
  SettingsSub: Subscription;
  shippingChargesSub : Subscription;
  isInHouseDeliveryActive = false;
  user$: Observable<any> = this._store.select(selectUser)
  settings$: Observable<any> = this._store.select(selectSettings);
  shippingCharges$: Observable<any> = this._store.select(selectShippingCharges);

  userSub: Subscription;
  userId: any;
  shopDetails$: Observable<any> = this._store.select(selectShopDetails);
  shopDetailsSub: Subscription;
  
  shippingForm = this.fb.group({
    customer_pickup : [true],
    deliveryavailable : [false],
    fixedPrices : this.fb.array([
      // this.createFixedPrice()
    ])
  })

  createFixedPrice(city='', charge='') {
    return this.fb.group({  
      city: [city],
      charge: [charge]      
    })
  }

  get fixedPrices()  {
    return this.shippingForm.get('fixedPrices') as FormArray;
  }

  cities : Array<any> = [];

   onAddLocation()  {
    this.fixedPrices.push(this.createFixedPrice());
    
  }

  onReset(index)  {
    let fGroup = this.fixedPrices.controls[index];
    fGroup.reset();
  }

  onSave()  {

    if(this.shippingForm.valid)  {
      this._store.dispatch(new PostShippingCharges({...this.shippingForm.value, userId : this.userId }));
    }
  }

  goBack()  {
    this.navCtrl.back();
  }
  

  constructor(private navCtrl: NavController, private fb: FormBuilder,  private _store: Store<State>) { }

  ngOnInit() {}

  ionViewDidEnter() {


    this.userSub = this.user$.subscribe( data => data && (this.userId = data['id']));

    this.shopDetailsSub = this.shopDetails$.subscribe(data => {
      if(data && data.country)  {
        this.cities = cities(data.country) || [];
      }
    });

    this.shippingChargesSub = combineLatest(this.settings$, this.shippingCharges$).pipe(take(1)).subscribe( ([settingsVal, shippingChargesVal]) => {
     if(settingsVal)  {
      this.shippingForm.get('deliveryavailable').setValue(settingsVal.deliveryavailable);
      if(shippingChargesVal && shippingChargesVal.length)  {
        
        shippingChargesVal.forEach(({city, charge}) => {
          this.fixedPrices.push(this.createFixedPrice(city, charge));
        });

      }
      else {
        this.onAddLocation();
      }

     }
     else {
      this.onAddLocation();
     }
      
    })

  }
  

  ionViewWillLeave(){
    if(this.userSub)  {
      this.userSub.unsubscribe();
    }

    if(this.shopDetailsSub)  {
      this.shopDetailsSub.unsubscribe();
    }

    if(this.shippingChargesSub)  {
      this.shippingChargesSub.unsubscribe();
    }


  }

}
