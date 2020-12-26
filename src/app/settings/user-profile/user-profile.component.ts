import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { UpdateAccount } from './../../store/actions';
import { selectUser } from './../../store/selectors';
import { UserProfile } from './../models';

import { ChangePasswordModalComponent } from './../change-password-modal/change-password-modal.component';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { showValidationMsg } from './../../common/form-validator';
import { counries, cities } from './../../common/countries_cities';

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
    country: new FormControl('', Validators.required),
    // storename: new FormControl('', Validators.required),
    // phoneNumber: new FormControl('', Validators.required),
  });
  user$: Observable<any> = this._store.select(selectUser);
  userId : any;
  userSub : Subscription;
  countries : Array<string> = counries()
  
  onSubmit()  {
    if(this.createAccountForm.valid)  {
      this.createAccountForm.get('password').value == "********" ? this._store.dispatch(new UpdateAccount(UserProfile.fromAPI({...this.createAccountForm.value, id: this.userId}))) : this._store.dispatch(new UpdateAccount({...this.createAccountForm.value, id: this.userId}));
    }
    else {
      showValidationMsg(this.createAccountForm)
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

  ionViewWillEnter(){
    this.userSub = this.user$.pipe(map(UserProfile.fromAPI)).subscribe(data => {
      this.userId = data.id;
      this.createAccountForm.patchValue(data)
    });
  }

  ionViewWillLeave(){
    if(this.userSub)  {
      this.userSub.unsubscribe();
    }
  }

  constructor(private navCtrl: NavController, private _store: Store<State>, private modalController: ModalController) { }

  ngOnInit() {}

}
