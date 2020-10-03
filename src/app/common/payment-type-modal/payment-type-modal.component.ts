import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { PaymentOptions } from './../models';

@Component({
  selector: 'app-payment-type-modal',
  templateUrl: './payment-type-modal.component.html',
  styleUrls: ['./payment-type-modal.component.scss'],
})
export class PaymentTypeModalComponent implements OnInit {

  paymentOptions = PaymentOptions;

  onDismiss()  {
    this.modalController.dismiss();
  }

  onSelect(paymentOption)  {
    this.modalController.dismiss(paymentOption);
  }
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

}
