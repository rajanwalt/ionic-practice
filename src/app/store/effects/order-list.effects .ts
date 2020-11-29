import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, throwError } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EOrderListActions, SetOrderList, OnOrderListSuccess, GetOrderList, PostOrderList} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class OrderListEffects {

  getOrderList$ = createEffect(() => this.actions$.pipe(
    ofType(EOrderListActions.GetOrderList),
    switchMap((action: GetOrderList)=> this.monekatService.getOrderList(action.payload)
      .pipe(
        map(OrderListDetails => new SetOrderList(OrderListDetails)),
        catchError((error) => throwError(error))
      ))
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EOrderListActions.OnOrderListSuccess),
    tap( _ => this.navCtrl.back())),
    { dispatch: false });

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}