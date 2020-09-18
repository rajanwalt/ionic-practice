import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { State } from './../../store/state';
import { GetVat, PostVat } from './../../store/actions';
import { selectVat} from './../../store/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss'],
})
export class VatComponent implements OnInit {

  vatSub: Subscription;

  vatForm = new FormGroup({
    rate: new FormControl('0.00', Validators.required),
    trn: new FormControl('Etavjs', Validators.required),
  });
  
  
  onApply()  {
    if(this.vatForm.valid)  {
      this._store.dispatch(new PostVat(this.vatForm.value));
    }
  }

  goBack()  {
    this.navCtrl.back();
  }

  constructor(private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this._store.dispatch(new GetVat({}));

    this.vatSub = this._store.select(selectVat).subscribe(data => {
      data && this.vatForm.patchValue(data);
    })
  }

}
