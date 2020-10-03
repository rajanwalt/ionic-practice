import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  goToLogin()  {
    this.navCtrl.navigateForward('/login')
  }

  goToCreateAccount()  {
    this.navCtrl.navigateForward('/create-account')

  }

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

}
