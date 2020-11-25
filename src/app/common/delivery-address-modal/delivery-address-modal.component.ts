import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { counries, cities } from './../../common/countries_cities';
import { showValidationMsg } from './../../common/form-validator';

@Component({
  selector: 'app-delivery-address-modal',
  templateUrl: './delivery-address-modal.component.html',
  styleUrls: ['./delivery-address-modal.component.scss'],
})
export class DeliveryAddressModalComponent implements OnInit {

  @Input() deliveryAddress : any = null;

  countries : Array<string> = counries()
  cities : Array<any> = [];

  customerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl(''),
    phonenumber: new FormControl('', Validators.required),
    country: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl('')
  });

  onChangeCountry(event)  {
    let country = event.detail.value;
    this.cities = cities(country) || [];
  }

  onDismiss()  {
    this.modalController.dismiss(this.deliveryAddress);
  }

  onSave()  {
    if(this.customerForm.valid)  {
      this.modalController.dismiss(this.customerForm.value);
    }
    else {
      showValidationMsg(this.customerForm)
    }
  }
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {

    if(this.deliveryAddress )  {
      this.customerForm.patchValue(this.deliveryAddress)
      this.deliveryAddress.country &&  (this.cities = cities(this.deliveryAddress.country) || []);
    }

  }

}
