import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EFileActions, SetFile, OnFileSuccess, GetFile, PostFile} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class FileEffects {

  getFile$ = createEffect(() => this.actions$.pipe(
    ofType(EFileActions.GetFile),
    switchMap((action: GetFile)=> this.monekatService.getFile(action.payload)
      .pipe(
        map(FileDetails => new SetFile(FileDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postFile$ = createEffect(() => this.actions$.pipe(
    ofType(EFileActions.PostFile),
    switchMap((action: PostFile) => {
      let formData = new FormData();
      action.payload['file'] && formData.append("file", action.payload['file']);
      action.payload['itemId'] && formData.append("itemId", action.payload['itemId']);
      action.payload['serviceId'] && formData.append("serviceId", action.payload['serviceId']);

      return this.monekatService.postFile(formData)
      .pipe(
        map( fileInfo => new OnFileSuccess(fileInfo)),
        catchError(() => EMPTY)
      )
    })
    )
  );

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EFileActions.OnFileSuccess),
    // tap( _ => this.navCtrl.back())
    ),
    { dispatch: false });

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}