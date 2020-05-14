import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MonekatService } from './../../APIs';

import { EShopDetailsActions, SetShopDetails, AddShopDetails} from './../actions';

@Injectable()
export class ShopDetailsEffects {

  getShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopDetailsActions.GetShopDetails),
    switchMap(() => this.monekatService.getShopDetails()
      .pipe(
        map(shopDetails => new SetShopDetails(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopDetailsActions.AddShopDetails),
    switchMap((action: AddShopDetails) => this.monekatService.postShopDetails(action.payload)
      .pipe(
        map(shopDetails => new SetShopDetails(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService
  ) {}
}