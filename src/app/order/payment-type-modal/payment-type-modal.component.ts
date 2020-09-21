import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-type-modal',
  templateUrl: './payment-type-modal.component.html',
  styleUrls: ['./payment-type-modal.component.scss'],
})
export class PaymentTypeModalComponent implements OnInit {

  onDismiss()  {
    this.modalController.dismiss();
  }

  onSelect()  {
    this.modalController.dismiss();
  }
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

}
