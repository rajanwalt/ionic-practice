import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-delivery-address-modal',
  templateUrl: './delivery-address-modal.component.html',
  styleUrls: ['./delivery-address-modal.component.scss'],
})
export class DeliveryAddressModalComponent implements OnInit {

  @Input() deliveryAddress : object = null;

  countries : Array<string> = [
    "UAE"
  ];

  cities : Array<string> = [
    "Dubai",
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
    this.modalController.dismiss(this.deliveryAddress);
  }

  onSave()  {
    this.customerForm.valid && this.modalController.dismiss(this.customerForm.value);
  }
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.deliveryAddress && this.customerForm.patchValue(this.deliveryAddress)
  }

}
