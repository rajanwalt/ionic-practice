import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { ECustomersActions, SetCustomers, AddCustomers, CustomerSuccess, UpdateCustomers} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class CustomersEffects {

  getCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(ECustomersActions.GetCustomers),
    switchMap(() => this.monekatService.getCustomers()
      .pipe(
        map(customerdetails => new SetCustomers(customerdetails)),
        catchError(() => EMPTY)
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