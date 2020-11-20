import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, throwError } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { ECustomersActions, SetCustomers, AddCustomers, CustomerSuccess, UpdateCustomers, GetCustomers, PutCustomer} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class CustomersEffects {

  getCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(ECustomersActions.GetCustomers),
    switchMap((action: GetCustomers)=> this.monekatService.getCustomers(action.payload)
      .pipe(
        map(customerdetails => new SetCustomers(customerdetails)),
        catchError((error) => throwError(error))
      ))
    )
  );

  postCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(ECustomersActions.AddCustomers),
    switchMap((action: AddCustomers) => this.monekatService.addCustomer(action.payload)
      .pipe(
        map(customerdetails => new CustomerSuccess(action.payload)),
        catchError(() => EMPTY)
      ))
    )
  );

  putCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(ECustomersActions.PutCustomer),
    switchMap((action: PutCustomer) => this.monekatService.putCustomer(action.payload)
      .pipe(
        map(customerdetails => new CustomerSuccess(customerdetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ECustomersActions.CustomerSuccess),
    map((action: CustomerSuccess) => new UpdateCustomers(action.payload)),
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