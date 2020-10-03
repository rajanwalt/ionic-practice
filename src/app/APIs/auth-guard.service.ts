import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot} from '@angular/router';

import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from './../store/state';
import { selectUser } from './../store/selectors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  user$: Observable<any> = this._store.select(selectUser);

  constructor(private _store: Store<State>, private navCtrl: NavController) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean>  {
    return this.user$.pipe(map(data => {
      if(!data)  {
        this.navCtrl.navigateForward('/login');
        return false;
      }
      return true;
    }));
  }

}
