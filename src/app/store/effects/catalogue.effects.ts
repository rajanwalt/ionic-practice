import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { ECatalogueActions, SetCatalogue, UpdateCatalogue, AddCatalogue, CatalogueSuccess, GetCatalogue} from '../actions';
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
        map(shopDetails => new CatalogueSuccess(shopDetails)),
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