import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { Login } from './../../store/actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  
  onSubmit()  {
    if(this.loginForm.valid)  {
      this._store.dispatch(new Login(this.loginForm.value));
    }
  }

  goBack()  {
    this.navCtrl.back();
  }

  constructor(private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {}

}
