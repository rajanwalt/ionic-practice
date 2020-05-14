import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { ECustomersActions, SetCustomers, AddCustomers} from '../actions';

@Injectable()
export class CustomersEffects {

  getCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(ECustomersActions.GetCustomers),
    switchMap(() => this.monekatService.getCustomers()
      .pipe(
        map(shopDetails => new SetCustomers(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(ECustomersActions.AddCustomers),
    switchMap((action: AddCustomers) => this.monekatService.addCustomer(action.payload)
      .pipe(
        map(shopDetails => new SetCustomers(action.payload)),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService
  ) {}
}