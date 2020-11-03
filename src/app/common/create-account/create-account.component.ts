import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';

import { CreateAccount } from './../../store/actions';

enum BUSINESSTYPES {
  LEGAL_BUSINESS = "Legal Business",
  LEGAL_ORGANIZATION = "Legal Organization",
  LEAGAL_SOLETRADER = "Legal Soletrader",
  FREELANCER = "Freelancer"
}

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
    businessType: new FormControl('', Validators.required),

    // storename: new FormControl('', Validators.required),
    // phoneNumber: new FormControl('', Validators.required),
  });
  
  public businessTypes = BUSINESSTYPES;

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

  onChangeBusinessType(event)  {
    let selectedBusinessType = event.detail.value;

    switch(selectedBusinessType)  {
      case BUSINESSTYPES.LEGAL_ORGANIZATION: {

        break;
      }
      default: {
        break;
      }
    }

  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    // this.ionicForm.get('dob').setValue(date, {
    //    onlyself: true
    // })
  }

  constructor(private navCtrl: NavController, private _store: Store<State>) { }


  ngOnInit() {}

}
