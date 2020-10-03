import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import {  ELoginActions, Login, CreateAccount, CreateAccountSuccess, SetUser, LoginSuccess} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class LoginEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.Login),
    switchMap((action: Login)=> this.monekatService.login(action.payload)
      .pipe(
        map(customerdetails => new LoginSuccess(customerdetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  createAccount$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.CreateAccount),
    switchMap((action: CreateAccount) => this.monekatService.createAccount(action.payload)
      .pipe(
        map(customerdetails => new CreateAccountSuccess(action.payload)),
        catchError(() => EMPTY)
      ))
    )
  );

  onCreateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.CreateAccountSuccess),
    map((action: CreateAccountSuccess) => new SetUser(action.payload)),
    tap( _ => {
      this.navCtrl.navigateForward('/shop-payment-setup');
    })
  ));

  onLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.LoginSuccess),
    map((action: LoginSuccess) => new SetUser(action.payload)),
    tap( _ => {
      this.navCtrl.navigateForward('/main');
    })
  ));

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}