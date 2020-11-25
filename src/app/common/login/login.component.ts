import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { Login } from './../../store/actions';
import { showValidationMsg } from './../../common/form-validator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required), //test@test.com
    password: new FormControl('', Validators.required), //12345678
  });
  
  
  onSubmit()  {
    if(this.loginForm.valid)  {
      this._store.dispatch(new Login(this.loginForm.value));
    }
    else {
      showValidationMsg(this.loginForm)
    }
  }

  goBack()  {
    this.navCtrl.navigateRoot('/welcome');
  }

  constructor(private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {}

}
