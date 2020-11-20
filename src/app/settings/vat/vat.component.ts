import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { PostSettings, PostVat } from './../../store/actions';
import { Observable, Subscription } from 'rxjs';
import { selectUser, selectSettings } from './../../store/selectors';
import { showValidationMsg } from './../../common/form-validator';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss'],
})
export class VatComponent implements OnInit {

  SettingsSub: Subscription;
  userSub: Subscription;
  userId: any;
  user$: Observable<any> = this._store.select(selectUser)
  settings$: Observable<any> = this._store.select(selectSettings);
  // vatPattern = "/^[0-9]+(\.[0-9]{1,2})?$/"

  vatForm = new FormGroup({
    vat: new FormControl('0.00', Validators.required),
    trn: new FormControl('Etavjs', Validators.required),
  });
  
  
  onApply()  {
    if(this.vatForm.valid)  {
      this._store.dispatch(new PostSettings({...this.vatForm.value, userId: this.userId } ));
    }
    else {
      showValidationMsg(this.vatForm)
    }
  }

  goBack()  {
    this.navCtrl.back();
  }

  constructor(private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {}

  ionViewDidEnter() {

    this.SettingsSub = this.settings$.subscribe(data => {
      data && this.vatForm.patchValue(data);
    })

    this.userSub = this.user$.subscribe( data => data && (this.userId = data['id']));
  }

  ionViewDidLeave(){
    if(this.SettingsSub)  {
      this.SettingsSub.unsubscribe();
    }
  }

}
