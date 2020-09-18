import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EPaymentMethodsActions, OnPaymentMethodsSuccess, GetPaymentMethods, UpdatePaymentMethods, SetPaymentMethods} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class PaymentSettingsEffects {

  getPaymentMethods$ = createEffect(() => this.actions$.pipe(
    ofType(EPaymentMethodsActions.GetPaymentMethods),
    switchMap(() => this.monekatService.getPaymentSettings()
      .pipe(
        map(paymentMethods => new SetPaymentMethods(paymentMethods)),
        catchError(() => EMPTY)
      ))
    )
  );

  updatePaymentMethods$ = createEffect(() => this.actions$.pipe(
    ofType(EPaymentMethodsActions.UpdatePaymentMethods),
    switchMap((action: UpdatePaymentMethods) => this.monekatService.updatePaymentSettings(action.payload)
      .pipe(
        map(paymentMethods => new OnPaymentMethodsSuccess(paymentMethods)),
        catchError(() => EMPTY)
      ))
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EPaymentMethodsActions.OnPaymentMethodsSuccess),
    map((action: OnPaymentMethodsSuccess) => new SetPaymentMethods(action.payload)),
    tap( _ => {
      this.navCtrl.back();
    })
  ));

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}