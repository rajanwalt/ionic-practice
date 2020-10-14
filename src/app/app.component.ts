import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterStateService } from './common';
import {  Store } from '@ngrx/store';
import { State } from './store/state';
import { selectPendingRequests } from './store/selectors'
import { Observable, of } from 'rxjs';

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
    private _store: Store<State>
  ) {
    this.initializeApp();
    this.routerStateService.loadRouting();
  }

  initializeApp() {
    this.platform.ready().then((response) => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
