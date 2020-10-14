import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';

import { CreateAccount } from './../../store/actions';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {

  createAccountForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    // storename: new FormControl('', Validators.required),
    // phoneNumber: new FormControl('', Validators.required),
  });
  
  isChecked = false;
  
  onSubmit()  {
    if(this.createAccountForm.valid)  {
      this._store.dispatch(new CreateAccount(this.createAccountForm.value));
    }
  }

  goBack()  {
    this.navCtrl.back();
  }

  checkTandC()  {
    this.isChecked = !this.isChecked;
  }

  constructor(private navCtrl: NavController, private _store: Store<State>) { }


  ngOnInit() {}

}
