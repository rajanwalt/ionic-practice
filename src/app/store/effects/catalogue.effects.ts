import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { ECatalogueActions, SetCatalogue, UpdateCatalogue, AddCatalogue, CatalogueSuccess, GetCatalogue, SetOrder} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class CatalogueEffects {

  getCatalogue$ = createEffect(() => this.actions$.pipe(
    ofType(ECatalogueActions.GetCatalogue),
    switchMap((action: GetCatalogue) => this.monekatService.getCatalogue(action.payload)
      .pipe(
        map(shopDetails => new SetCatalogue(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postCatalogue$ = createEffect(() => this.actions$.pipe(
    ofType(ECatalogueActions.AddCatalogue),
    switchMap((action: AddCatalogue) => this.monekatService.addCatalogue(action.payload)
      .pipe(
        switchMap(orderDetails => [
          new UpdateCatalogue(orderDetails),
          // ... action.payload['from'] ? [new SetOrder({ orderDetails : [ { ...orderDetails, count: 1 }] })] : []
        ]),
        tap( _ => action.payload['from'] ? this.navCtrl.navigateForward('/order/add_item') : this.navCtrl.back()), //action.payload['from'] ? this.navCtrl.navigateForward('/order/order_summary') : this.navCtrl.back()),
        catchError(() => EMPTY)
      ))
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ECatalogueActions.CatalogueSuccess),
    map((action: CatalogueSuccess) => new UpdateCatalogue(action.payload)),
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