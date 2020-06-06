import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EShopActions, ShopSuccess, PostShop, SetShop} from '../actions';
import { NavController } from '@ionic/angular';

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
        map(shopDetails => new ShopSuccess(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.ShopSuccess),
    map((action: ShopSuccess) => new SetShop(action.payload)),
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