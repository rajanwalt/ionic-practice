import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  listOfSettings = [
    {
      "icon" : "person-outline",
      "title" : "Your Profile",
      "link" : " "
    },
    {
      "icon" : "radio-outline",
      "title" : "Communication Services",
      "link" : " "
    },
    {
      "icon" : "cash-outline",
      "title" : "Payment Settings",
      "link" : "payment_settings"
    },
    {
      "icon" : "cart-outline",
      "title" : "Shipping",
      "link" : " "
    },
    {
      "icon" : "reader-outline",
      "title" : "VAT",
      "link" : " "
    },
    {
      "icon" : "earth-outline",
      "title" : "Languages",
      "link" : " "
    },
    {
      "icon" : "log-out-outline",
      "title" : "Logout",
      "link" : " "
    }
  ];

  navigateTo(link)  {
    link && this.navCtrl.navigateForward(`/settings/${link}`);
  }

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

}
