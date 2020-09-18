import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EVatActions, SetVat, OnVatSuccess, GetVat, PostVat} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class VatEffects {

  getVat$ = createEffect(() => this.actions$.pipe(
    ofType(EVatActions.GetVat),
    switchMap((action: GetVat)=> this.monekatService.getVat()
      .pipe(
        map(vatDetails => new SetVat(vatDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postVat$ = createEffect(() => this.actions$.pipe(
    ofType(EVatActions.PostVat),
    switchMap((action: PostVat) => this.monekatService.postVat(action.payload)
      .pipe(
        map(customerdetails => new OnVatSuccess(action.payload)),
        catchError(() => EMPTY)
      ))
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EVatActions.OnVatSuccess),
    tap( _ => this.navCtrl.back())),
    { dispatch: false });

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}