import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { UpdateAccount } from './../../store/actions';

import { ChangePasswordModalComponent } from './../change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  createAccountForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('********', Validators.required),
    // storename: new FormControl('', Validators.required),
    // phoneNumber: new FormControl('', Validators.required),
  });

  onSubmit()  {
    if(this.createAccountForm.valid)  {
      this._store.dispatch(new UpdateAccount(this.createAccountForm.value));
    }
  }

  async onShowChangePasswordModal()  {
    const modal = await this.modalController.create({
      component: ChangePasswordModalComponent,
    });
    await modal.present();

    const { data : password } = await modal.onWillDismiss();
    
    if(password) {
      this.createAccountForm.controls['password'].setValue(password);
    }
  }


  goBack()  {
    this.navCtrl.back();
  }

  constructor(private navCtrl: NavController, private _store: Store<State>, private modalController: ModalController) { }

  ngOnInit() {}

}
