import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterStateService } from './common';
import {  Store } from '@ngrx/store';
import { State } from './store/state';
import { selectPendingRequests } from './store/selectors';
import { Login } from './store/actions';
import { Observable, of } from 'rxjs';

import { getStorage } from './common'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public pendingRequests$: Observable<any> = this._store.select(selectPendingRequests);
  // public pendingRequests$: Observable<any> = of(1);

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private routerStateService: RouterStateService,
    private _store: Store<State>,
    private navCtrl: NavController,
    private translate: TranslateService
  ) {
    this.initializeApp();
    this.routerStateService.loadRouting();
  }

  initializeApp() {
    this.platform.ready().then(async (response) => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      console.log(response);

      if(response != "dom")  {
        let login = await getStorage('login');
      
        if(login)  {
          this._store.dispatch(new Login(login));
        }
        else {
          this.navCtrl.navigateForward('/welcome')
        }
      }
      

    });
    

    this.translate.setDefaultLang('en');
  }
}
