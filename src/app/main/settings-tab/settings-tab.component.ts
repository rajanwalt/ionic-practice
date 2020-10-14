import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { State } from './../../store/state';

import { Logout } from './../../store/actions';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.scss'],
})
export class SettingsTabComponent implements OnInit {

  listOfSettings = [
    {
      "icon" : "person-outline",
      "title" : "Your Profile",
      "link" : "profile"
    },
    {
      "icon" : "radio-outline",
      "title" : "Communication Services",
      "link" : "communication_services"
    },
    {
      "icon" : "cash-outline",
      "title" : "Payment Settings",
      "link" : "payment_settings"
    },
    {
      "icon" : "cart-outline",
      "title" : "Shipping",
      "link" : "shipping"
    },
    {
      "icon" : "reader-outline",
      "title" : "VAT",
      "link" : "vat"
    },
    {
      "icon" : "earth-outline",
      "title" : "Languages",
      "link" : "language"
    },
    {
      "icon" : "log-out-outline",
      "title" : "Logout",
      "link" : "logout"
    }
  ];

  navigateTo(link)  {
    if(link && link != 'logout') {
      this.navCtrl.navigateForward(`/settings/${link}`);
    }
    else {
      this._store.dispatch(new Logout());
      this.navCtrl.navigateForward('/');
    }
  }
  
  constructor(private navCtrl: NavController, private _store: Store<State>) { }

  ngOnInit() {}

}
