import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { counries, cities } from './../../common/countries_cities';

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
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
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
    this.customerForm.valid && this.modalController.dismiss(this.customerForm.value);
  }
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {

    if(this.deliveryAddress )  {
      this.customerForm.patchValue(this.deliveryAddress)
      this.deliveryAddress.country &&  (this.cities = cities(this.deliveryAddress.country) || []);
    }

  }

}
