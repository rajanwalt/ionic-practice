import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
      "link" : " "
    }
  ];

  navigateTo(link)  {
    console.log("link", link)
    link && this.navCtrl.navigateForward(`/settings/${link}`);
  }
  
  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

}
