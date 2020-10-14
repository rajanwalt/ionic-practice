import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EWalletActions, SetWallet, OnWalletSuccess, GetWallet, PostWallet} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class WalletEffects {

  getWallet$ = createEffect(() => this.actions$.pipe(
    ofType(EWalletActions.GetWallet),
    switchMap((action: GetWallet)=> this.monekatService.getWallet()
      .pipe(
        map(WalletDetails => new SetWallet(WalletDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postWallet$ = createEffect(() => this.actions$.pipe(
    ofType(EWalletActions.PostWallet),
    switchMap((action: PostWallet) => this.monekatService.postWallet(action.payload)
      .pipe(
        map(customerdetails => new OnWalletSuccess(action.payload)),
        catchError(() => EMPTY)
      ))
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EWalletActions.OnWalletSuccess),
    tap( _ => this.navCtrl.back())),
    { dispatch: false });

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}