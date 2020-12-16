import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, throwError } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { ESettingsActions, SetSettings, OnSettingsSuccess, GetSettings, PostSettings} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class SettingsEffects {

  getSettings$ = createEffect(() => this.actions$.pipe(
    ofType(ESettingsActions.GetSettings),
    switchMap((action: GetSettings)=> this.monekatService.getVat()
      .pipe(
        map(SettingsDetails => new SetSettings(SettingsDetails)),
        catchError((error) => throwError(error))
      ))
    )
  );

  postSettings$ = createEffect(() => this.actions$.pipe(
    ofType(ESettingsActions.PostSettings),
    switchMap((action: PostSettings) => this.monekatService.postSettings(action.payload)
      .pipe(
        map(SettingsDetails => new OnSettingsSuccess(SettingsDetails['item'] ? SettingsDetails['item'] : SettingsDetails)),
        catchError((error) => throwError(error))
      ))
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ESettingsActions.OnSettingsSuccess),
    map((action : OnSettingsSuccess) => new SetSettings(action.payload)),
    tap( _ => this.navCtrl.back()))
  );

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}