import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core'; 
import { State } from './../../store/state';
import { setStorage, getStorage } from './../../common';


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
    this.translate.use(this.selectedLanguage.LOCALE_ID);
    setStorage("language", this.selectedLanguage.LOCALE_ID);
    
    this.goBack();
  }

  onSelect(language: LanguageModel)  {
    this.selectedLanguage = language;
    // this.translate.setDefaultLang(language.LOCALE_ID);
  }

  goBack()  {
    this.navCtrl.back();
  }

  constructor(private navCtrl: NavController, private _store: Store<State>, public translate: TranslateService) { }

  ngOnInit() {}

  async ionViewWillEnter(){
    let language = await getStorage('language');
    if(language)  {
      let [resLanguage] = this.languages.filter( data => data.LOCALE_ID == language);
      resLanguage && (this.selectedLanguage = resLanguage)
    }
    
  }

}
