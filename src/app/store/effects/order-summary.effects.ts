import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EOrderSummaryActions, PostOrderSummary, SetOrderStatus} from '../actions';

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

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService
  ) {}
}