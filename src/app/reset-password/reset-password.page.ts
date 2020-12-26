import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { showValidationMsg } from './../common/form-validator';
import { MonekatService } from '../APIs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  forgotForm = new FormGroup({
    email: new FormControl('', Validators.required)
  });

  forgotSub : Subscription;

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: `The Reset password link has been sent to ${this.forgotForm.get('email').value}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  onSubmit()  {
    if(this.forgotForm.valid)  {
      this.forgotSub = this.monekatService.forgotPassword(this.forgotForm.value).subscribe( data => {
        if(data)  {
          this.presentAlert()
        }
      })
    }
    else {
      showValidationMsg(this.forgotForm)
    }
  }

  goBack()  {
    this.navCtrl.back();
  }

  ionViewDidLeave(){
    if(this.forgotSub)  {
      this.forgotSub.unsubscribe();
    }
  }

  constructor(private navCtrl: NavController, 
              private monekatService: MonekatService,
              public alertController: AlertController ) { }

  ngOnInit() {}

}
