import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { showValidationMsg } from './../../common/form-validator';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {

  passwordForm = new FormGroup({
    // oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, {validators: this.checkPassword});

  checkPassword(group: FormGroup)  {
    let newPassword = group.get('newPassword').value;
    let confirmPassword = group.get('confirmPassword').value;

    return newPassword === confirmPassword ? null : { notSame: true};
  }
  
  onDismiss()  {
    this.modalController.dismiss(null);
  }

  onSubmit()  {
    if(this.passwordForm.valid) {
      this.modalController.dismiss(this.passwordForm.get('newPassword').value)
    } 
    else {
      showValidationMsg(this.passwordForm)
    }
  }

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

}
