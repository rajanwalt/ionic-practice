import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';

import { Logout } from './../../store/actions';
import { removeStorage, getStorage } from './../../common';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.scss'],
})
export class SettingsTabComponent implements OnInit {

  listOfSettings = [
    {
      "icon" : "./../../../assets/icon/Profile.svg",
      "title" : "Your Profile",
      "link" : "profile"
    },
    {
      "icon" : "./../../../assets/icon/Payment.svg",
      "title" : "Payment Settings",
      "link" : "payment_settings"
    },
    {
      "icon" : "./../../../assets/icon/Delivery.svg",
      "title" : "Shipping",
      "link" : "shipping"
    },
    {
      "icon" : "./../../../assets/icon/VAT.svg",
      "title" : "VAT",
      "link" : "vat"
    },
    {
      "icon" : "./../../../assets/icon/Language.svg",
      "title" : "Languages",
      "link" : "languages"
    },
    {
      "icon" : "./../../../assets/icon/Logout.svg",
      "title" : "Logout",
      "link" : "logout"
    }
  ];

  getTranslate(input)  {
    return input ? this.translate.instant(`settings.${input}`) : ""
  }

  async navigateTo(link)  {
    if(link && link != 'logout') {
      this.navCtrl.navigateForward(`/settings/${link}`);
    }
    else {
      this._store.dispatch(new Logout());
      removeStorage('login');

      let language = await getStorage('language');
      if(language) {
        this.translate.use('en');
        removeStorage('language');
      }
      
      this.navCtrl.navigateForward('/welcome');
    }
  }
  
  constructor(private navCtrl: NavController, private _store: Store<State>, private translate: TranslateService) { }

  ngOnInit() {}

}
