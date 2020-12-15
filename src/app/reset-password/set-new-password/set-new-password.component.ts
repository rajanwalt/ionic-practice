import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { showValidationMsg } from './../../common/form-validator';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss'],
})
export class SetNewPasswordComponent implements OnInit {

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

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: `Your password has been reset successfully!`,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  onSubmit()  {
    if(this.passwordForm.valid) {
      // this.modalController.dismiss(this.passwordForm.get('newPassword').value)
      
      //Post password
      this.presentAlert()
    } 
    else {
      showValidationMsg(this.passwordForm)
    }
  }

  constructor(public alertController: AlertController) { }

  ngOnInit() {}

}
