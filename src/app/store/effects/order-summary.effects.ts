import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EOrderSummaryActions, PostOrderSummary, GetFinalOrderSummary, UpdateOrderSummary, SetOrderStatus, OnOrderSuccess, EOrderStatusActions } from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class OrderSummaryEffects {

  postOrderSummary$ = createEffect(() => this.actions$.pipe(
    ofType(EOrderSummaryActions.PostOrderSummary),
    switchMap((action: PostOrderSummary) => this.monekatService.postOrderSummary(action.payload)
      .pipe(
        map(status => new SetOrderStatus(status)),
        catchError(() => EMPTY)
      ))
    )
  );

  getFinalOrderSummary$ = createEffect(() => this.actions$.pipe(
    ofType(EOrderSummaryActions.GetFinalOrderSummary),
    switchMap((action: GetFinalOrderSummary) => this.monekatService.getOrder(action.payload)
      .pipe(
        map(status => new SetOrderStatus(status)),
        catchError(() => EMPTY)
      ))
    )
  );

  updateOrderSummary$ = createEffect(() => this.actions$.pipe(
    ofType(EOrderSummaryActions.UpdateOrderSummary),
    switchMap((action: UpdateOrderSummary) => this.monekatService.updateOrderSummary(action.payload)
      .pipe(
        map(status => new OnOrderSuccess(status)),
        catchError(() => EMPTY)
      ))
    )
  );

  onOrderSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EOrderStatusActions.OnOrderSuccess),
    map((action: OnOrderSuccess) => new SetOrderStatus(action.payload)),
    tap( _ => {
      this.navCtrl.navigateForward('');
    })
  ));

  


  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}