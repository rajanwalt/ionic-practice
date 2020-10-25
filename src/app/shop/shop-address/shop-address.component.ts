import { Component, OnInit, SimpleChanges, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { counries, cities, countryCode } from './../../common/countries_cities';


@Component({
  selector: 'app-shop-address',
  templateUrl: './shop-address.component.html',
  styleUrls: ['./shop-address.component.scss'],
})
export class ShopAddressComponent implements OnInit, OnDestroy {
  
  countries : Array<string> = counries()
  cities : Array<any> = [];
  currencyCode: string = '';

  @Input() shopDetails : any = null;
  
  shopAddressForm = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl("", [Validators.required]),
    street: new FormControl("", Validators.required),
    currencyCode : new FormControl('')
  });


  constructor( private modalController: ModalController) { }

  onChangeCountry(event)  {
    let country = event.detail.value;
    let currencyCode = countryCode(country);

    this.cities = cities(country) || [];
    
    this.shopAddressForm.get('currencyCode').setValue(currencyCode);
  }

  
  onSubmit()  {

    this.shopAddressForm.valid && this.modalController.dismiss(this.shopAddressForm.value);
  }

  onDismiss()  {
    this.modalController.dismiss(this.shopDetails);
  }

  

  ngOnInit() {
      if(this.shopDetails && this.shopDetails.country)  {
        this.cities = cities(this.shopDetails.country) || [];
      }
  }
  
  ionViewDidEnter()  {
    this.shopDetails && this.shopAddressForm.patchValue(this.shopDetails);
  }

  ngOnDestroy(): void {
    // if(this.shopDetailsSub)  {
    //   this.shopDetailsSub.unsubscribe();
    // }
  }


}
