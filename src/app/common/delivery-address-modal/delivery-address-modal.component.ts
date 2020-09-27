import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delivery-address-modal',
  templateUrl: './delivery-address-modal.component.html',
  styleUrls: ['./delivery-address-modal.component.scss'],
})
export class DeliveryAddressModalComponent implements OnInit {

  countries : Array<string> = [
    "Dubai"
  ];

  cities : Array<string> = [
    "Abu Dhabi",
    "Sharjah"
  ];

  customerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(''),
    phoneNumber: new FormControl('', Validators.required),
    country: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl('')
  });

  onDismiss()  {
    this.modalController.dismiss();
  }

  onSave()  {
    this.customerForm.valid && this.modalController.dismiss(this.customerForm.value);
  }
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

}
