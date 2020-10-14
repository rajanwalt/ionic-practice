import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EShippingChargesActions, SetShippingCharges, OnShippingChargesSuccess, GetShippingCharges, PostShippingCharges} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class ShippingChargesEffects {

  getShippingCharges$ = createEffect(() => this.actions$.pipe(
    ofType(EShippingChargesActions.GetShippingCharges),
    switchMap((action: GetShippingCharges)=> this.monekatService.getShippingCharges()
      .pipe(
        map(ShippingChargesDetails => new SetShippingCharges(ShippingChargesDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postShippingCharges$ = createEffect(() => this.actions$.pipe(
    ofType(EShippingChargesActions.PostShippingCharges),
    switchMap((action: PostShippingCharges) => this.monekatService.postShippingCharges(action.payload)
      .pipe(
        map(customerdetails => new OnShippingChargesSuccess(action.payload)),
        catchError(() => EMPTY)
      ))
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EShippingChargesActions.OnShippingChargesSuccess),
    tap( _ => this.navCtrl.back())),
    { dispatch: false });

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}