import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core'; 
import { State } from './../../store/state';

interface LanguageModel  {
  name: string
  LOCALE_ID: string
}

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
})
export class LanguagesComponent implements OnInit {

  languages : LanguageModel[] = [
    {
      name : "English (US)",
      LOCALE_ID : 'en'
    },
    {
      name : "French",
      LOCALE_ID : 'fr'
    }
  ]

  selectedLanguage = this.languages[0];

  onApply()  {
    // this._store.dispatch(new SetOrder({shipmentOptions}))
  }

  onSelect(language: LanguageModel)  {
    this.selectedLanguage = language;
    this.translate.use(language.LOCALE_ID);

    // this.translate.setDefaultLang(language.LOCALE_ID);
  }

  goBack()  {
    this.navCtrl.back();
  }

  constructor(private navCtrl: NavController, private _store: Store<State>, public translate: TranslateService) { }

  ngOnInit() {}

}
