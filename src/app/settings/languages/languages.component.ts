import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {

  languages = [
    {
      name : "English (US)",
      LOCALE_ID : 'en-US'
    },
    {
      name : "French",
      LOCALE_ID : 'fr-FR'
    }
  ]

  selectedLanguage = this.languages[0];

  onApply()  {
    // this._store.dispatch(new SetOrder({shipmentOptions}))
  }

  onSelect(language)  {
    this.selectedLanguage = language;
  }

  goBack()  {
    this.navCtrl.back();
  }

  constructor(private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {}

}
