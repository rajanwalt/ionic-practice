import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EShippingChargesActions, SetShippingCharges, OnShippingChargesSuccess, GetShippingCharges, PostShippingCharges, OnSettingsSuccess, SetSettings} from '../actions';
import { NavController } from '@ionic/angular';
import { shippingCharges } from '../selectors';

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
    switchMap((action: PostShippingCharges) => {

      if(action.payload['deliveryavailable'])  {
        let {deliveryavailable, fixedPrices, userId} = action.payload;

        return combineLatest(this.monekatService.postShippingCharges({fixedPrices, userId}), this.monekatService.postSettings({deliveryavailable, userId}))
              .pipe(
                map(([shippingCharges, settings]) => new OnShippingChargesSuccess({shippingCharges, settings})),
                catchError(() => EMPTY)
              )
      }
      else {
        let {deliveryavailable, userId} = action.payload;

        return this.monekatService.postSettings({deliveryavailable, userId}).pipe(
          map(settings => new OnShippingChargesSuccess({settings})),
          catchError(() => EMPTY)
        )
      }
      
    })
    )
  );

  // onSuccess$ = createEffect(() => this.actions$.pipe(
  //   ofType(EShippingChargesActions.OnShippingChargesSuccess),
  //   map((action: OnShippingChargesSuccess) => action.payload.map( data => data['item'])),
  //   map((data) => new SetShippingCharges(data)),
  //   tap( _ => this.navCtrl.back())));

  onSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(EShippingChargesActions.OnShippingChargesSuccess),
      switchMap((action: OnShippingChargesSuccess) => {

        if(action.payload['shippingCharges'])  {
          let item = action.payload['shippingCharges'].map( data => data['item'] )
          return [ new SetShippingCharges(item), new SetSettings(action.payload['settings'])]
        }

        return [ new SetSettings(action.payload['settings']) ]
      }),
      tap( _ => this.navCtrl.back())));

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}