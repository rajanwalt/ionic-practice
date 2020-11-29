import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EWalletActions, SetWallet, OnWalletSuccess, GetWallet, ReleaseWallet} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class WalletEffects {

  getWallet$ = createEffect(() => this.actions$.pipe(
    ofType(EWalletActions.GetWallet),
    switchMap((action: GetWallet)=> this.monekatService.getWallet(action.payload)
      .pipe(
        map(WalletDetails => new SetWallet(WalletDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  ReleaseWallet$ = createEffect(() => this.actions$.pipe(
    ofType(EWalletActions.ReleaseWallet),
    switchMap((action: ReleaseWallet) => this.monekatService.ReleaseWallet(action.payload)
      .pipe(
        map(wallet => new OnWalletSuccess(wallet)),
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