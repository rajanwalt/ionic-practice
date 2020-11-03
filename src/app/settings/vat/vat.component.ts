import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { PostVat } from './../../store/actions';
import { Observable, Subscription } from 'rxjs';
import { selectUser, selectSetting } from './../../store/selectors';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss'],
})
export class VatComponent implements OnInit {

  vatSub: Subscription;
  userSub: Subscription;
  userId: any;
  user$: Observable<any> = this._store.select(selectUser)
  settings$: Observable<any> = this._store.select(state => selectSetting(selectUser(state)));
  // vatPattern = "/^[0-9]+(\.[0-9]{1,2})?$/"

  vatForm = new FormGroup({
    vat: new FormControl('0.00', Validators.required),
    trn: new FormControl('Etavjs', Validators.required),
  });
  
  
  onApply()  {
    if(this.vatForm.valid)  {
      this._store.dispatch(new PostVat({...this.vatForm.value, userId: this.userId } ));
    }
  }

  goBack()  {
    this.navCtrl.back();
  }

  constructor(private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {}

  ionViewDidEnter() {

    this.vatSub = this.settings$.subscribe(data => {
      data && data.length && this.vatForm.patchValue(data[0]);
    })

    this.userSub = this.user$.subscribe( data => data && (this.userId = data['id']));
  }

  ionViewDidLeave(){
    if(this.vatSub)  {
      this.vatSub.unsubscribe();
    }
  }

}
