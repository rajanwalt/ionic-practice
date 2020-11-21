import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, throwError } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import {  ELoginActions, Login, CreateAccount, UpdateAccount, CreateAccountSuccess, SetUser, LoginSuccess, SetShop, SetShippingCharges, UpdateAccountSuccess, SetSettings, LoginFailed} from '../actions';
import { NavController, ModalController } from '@ionic/angular';
import { setStorage } from './../../common';

@Injectable()
export class LoginEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.Login),
    switchMap((action: Login)=> this.monekatService.login(action.payload)
      .pipe(
        map(customerdetails => {
          setStorage("login", action.payload);
          return new LoginSuccess(customerdetails)
        }),
        catchError((error) => {
          // throwError(error)
          return of(new LoginFailed(error))
        })
      )
      ))
  );

  createAccount$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.CreateAccount),
    switchMap((action: CreateAccount) => this.monekatService.createAccount(action.payload)
      .pipe(
        map(customerdetails => {
          setStorage("login", {email : action.payload['Email'], password : action.payload['password']});
          return new CreateAccountSuccess(customerdetails)
        }),
        catchError((error) => throwError(error)  ))
    ))
  );

  updateAccount$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.UpdateAccount),
    switchMap((action: UpdateAccount) => this.monekatService.updateAccount(action.payload).pipe(
      map(userProfile => new UpdateAccountSuccess(userProfile)),
      tap( _ => {
        this.navCtrl.back();
      })
    )),
    catchError((error) => throwError(error))
  ));

  onCreateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.CreateAccountSuccess),
    map((action: CreateAccountSuccess) => new SetUser(action.payload)),
    tap( _ => {
      this.modalController.dismiss({});
      this.navCtrl.navigateRoot('/shop-payment-setup');
    })
  ));

  onLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.LoginSuccess),
    switchMap((action: LoginSuccess) => [
      new SetUser(action.payload),
      ... (action.payload['services'] && action.payload['services'].length) ? [new SetShop(action.payload['services'][0])] : [],
      ... (action.payload['charges'] ) ? [new SetShippingCharges(action.payload['charges'])] : [],
      ... (action.payload['settings'] && action.payload['settings'].length ) ? [ new SetSettings(action.payload['settings'][0])] : []
    ]),
    tap( _ => {
      this.navCtrl.navigateForward('/main');
    })
  ));

  onLoginFailed$ = createEffect(() => this.actions$.pipe(
    ofType(ELoginActions.LoginFailed),
    map((action: LoginFailed) => throwError(action.payload)),
    tap( () => {
      this.navCtrl.navigateForward('/login');
    })
    ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {}
}