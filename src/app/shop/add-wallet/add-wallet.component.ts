import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { counries } from './../../common/countries_cities';
import { showValidationMsg } from './../../common/form-validator';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';
import { selectUser, selectSettings } from './../../store/selectors';
import { PostSettings } from './../../store/actions';


@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss'],
})
export class AddWalletComponent implements OnInit {
  userSub: Subscription;
  SettingsSub: Subscription;

  user$: Observable<any> = this._store.select(selectUser);
  settings$: Observable<any> = this._store.select(selectSettings);

  userId: any;
  countries : Array<string> = counries()

  walletForm = new FormGroup({
    // country: new FormControl('', Validators.required),
    swiftcode: new FormControl('', Validators.required),
    iban: new FormControl('', Validators.required),
    bankname: new FormControl('', Validators.required),
    // accountName: new FormControl('', Validators.required),
    // accountNumber: new FormControl('', Validators.required),
  });

  onSubmit()  {
    if(this.walletForm.valid)  {
      this._store.dispatch(new PostSettings({...this.walletForm.value, userId: this.userId } ));
    }
    else {
      showValidationMsg(this.walletForm)
    }
  }
  
  constructor(private _store: Store<State>) { }

  ngOnInit() {}

  ionViewDidEnter(){
    
    this.SettingsSub = this.settings$.subscribe(data => {
      data && this.walletForm.patchValue(data);
    })

    this.userSub = this.user$.subscribe( data => data && (this.userId = data['id']));
  }

  ionViewDidLeave() {
    if(this.SettingsSub)  {
      this.SettingsSub.unsubscribe();
    }

    if(this.userSub)  {
      this.userSub.unsubscribe();
    }
  }

}
