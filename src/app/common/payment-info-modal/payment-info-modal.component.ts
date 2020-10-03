import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-info-modal',
  templateUrl: './payment-info-modal.component.html',
  styleUrls: ['./payment-info-modal.component.scss'],
})
export class PaymentInfoModalComponent implements OnInit {

  @Input() type : string;
  @Input() fee : any;

  onDismiss()  {
    this.modalController.dismiss();
  }

  constructor(public modalController: ModalController ) { }

  ngOnInit() {}

}
