import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { of, Subscription } from 'rxjs';
import { FormArray, FormGroup,  FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  shippingSub : Subscription;

  shippingForm = this.fb.group({
    customer_pickup : [true],
    in_house_delivery : [false],
    fixedPrices : this.fb.array([
      this.createFixedPrice()
    ])
  })

  createFixedPrice() {
    return this.fb.group({  
      cityName: [''],
      courierPrice: ['']      
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
    
  }

  goBack()  {
    this.navCtrl.back();
  }
  

  constructor(private navCtrl: NavController, private fb: FormBuilder) { }

  ngOnInit() {}

}
