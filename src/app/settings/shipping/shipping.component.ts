import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { of, Subscription } from 'rxjs';
import { FormArray, FormGroup,  FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { GetShippingCharges, PostShippingCharges } from './../../store/actions';


@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  shippingSub : Subscription;
  isInHouseDeliveryActive = false;
  
  shippingForm = this.fb.group({
    customer_pickup : [true],
    in_house_delivery : [false],
    fixedPrices : this.fb.array([
      this.createFixedPrice()
    ])
  })

  createFixedPrice() {
    return this.fb.group({  
      city: [''],
      charge: ['']      
    })
  }

  get fixedPrices()  {
    return this.shippingForm.get('fixedPrices') as FormArray;
  }

  cities = [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Al Ain"
  ];

   onAddLocation()  {
    this.fixedPrices.push(this.createFixedPrice());
    
  }

  onReset(index)  {
    let fGroup = this.fixedPrices.controls[index];
    fGroup.reset();
  }

  onSave()  {

    if(this.shippingForm.valid)  {
      this._store.dispatch(new PostShippingCharges(this.shippingForm.value));
    }
  }

  goBack()  {
    this.navCtrl.back();
  }
  

  constructor(private navCtrl: NavController, private fb: FormBuilder,  private _store: Store<State>) { }

  ngOnInit() {}

  ionViewDidEnter() {
    // this._store.dispatch(new GetShippingCharges({}));

    // this.vatSub = this._store.select(selectVat).subscribe(data => {
    //   data && this.vatForm.patchValue(data);
    // })
  }

}
