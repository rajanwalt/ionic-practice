import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { showValidationMsg } from './../../common/form-validator';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MonekatService } from './../../APIs';
import { Subscription } from 'rxjs';

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

  token;
  tokenSub: Subscription;

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
      this.tokenSub = this.monekatService.updatePassword({...this.passwordForm.value, token: this.token}).subscribe(res => {
        this.presentAlert()
      })
    } 
    else {
      showValidationMsg(this.passwordForm)
    }
  }

  constructor(public alertController: AlertController, 
              private activatedRoute: ActivatedRoute,
              private monekatService: MonekatService) { }

  ngOnInit() {
    let token = this.activatedRoute.snapshot.queryParamMap.get('id');

    if(token)  {
      this.token = token
    }
  }

  ngOnDestroy(){
    if(this.tokenSub)  {
      this.tokenSub.unsubscribe()
    }
  }

}
