import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EShopActions, GetShop, PostShop, SetShop} from '../actions';

@Injectable()
export class ShopEffects {

  getShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.GetShop),
    switchMap(() => this.monekatService.getShopDetails()
      .pipe(
        map(shopDetails => new SetShop(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.PostShop),
    switchMap((action: PostShop) => this.monekatService.postShopDetails(action.payload)
      .pipe(
        map(shopDetails => new SetShop(action.payload)),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService
  ) {}
}