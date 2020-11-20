import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { showValidationMsg } from './../../common/form-validator';

@Component({
  selector: 'app-add-custom-rate-modal',
  templateUrl: './add-custom-rate-modal.component.html',
  styleUrls: ['./add-custom-rate-modal.component.scss'],
})
export class AddCustomRateModalComponent implements OnInit {

  deliveryRateForm = new FormGroup({
    type: new FormControl('', Validators.required),
    charge: new FormControl('0.00', Validators.required),
  });
  
  onDismiss()  {
    this.modalController.dismiss(null);
  }

  onAddDeliveryRate()  {
    if(this.deliveryRateForm.valid) {
      this.modalController.dismiss(this.deliveryRateForm.value)
    }
    else {
      showValidationMsg(this.deliveryRateForm)
    }
  }

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

}
