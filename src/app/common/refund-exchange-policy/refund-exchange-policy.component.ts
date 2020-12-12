import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-refund-exchange-policy',
  templateUrl: './refund-exchange-policy.component.html',
  styleUrls: ['./refund-exchange-policy.component.scss'],
})
export class RefundExchangePolicyComponent implements OnInit {

  @Input() policy : string = '';

  onDismiss()  {
    this.modalController.dismiss();
  }

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

}
