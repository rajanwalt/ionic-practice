import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-custom-rate-modal',
  templateUrl: './add-custom-rate-modal.component.html',
  styleUrls: ['./add-custom-rate-modal.component.scss'],
})
export class AddCustomRateModalComponent implements OnInit {

  deliveryRateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    rate: new FormControl('0.00', Validators.required),
  });
  
  onDismiss()  {
    this.modalController.dismiss();
  }

  onAddDeliveryRate()  {

  }

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

}
