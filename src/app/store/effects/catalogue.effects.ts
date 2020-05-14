import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { ECatalogueActions, SetCatalogue, AddCatalogue} from '../actions';

@Injectable()
export class CatalogueEffects {

  getCatalogue$ = createEffect(() => this.actions$.pipe(
    ofType(ECatalogueActions.GetCatalogue),
    switchMap(() => this.monekatService.getCatalogue()
      .pipe(
        map(shopDetails => new SetCatalogue(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postCatalogue$ = createEffect(() => this.actions$.pipe(
    ofType(ECatalogueActions.AddCatalogue),
    switchMap((action: AddCatalogue) => this.monekatService.addCustomer(action.payload)
      .pipe(
        map(shopDetails => new SetCatalogue(action.payload)),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService
  ) {}
}