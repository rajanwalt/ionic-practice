import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, combineLatest, Observable } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import {  ECatalogueActions, 
          SetCatalogue, 
          UpdateCatalogue, 
          AddCatalogue, 
          CatalogueSuccess, 
          GetCatalogue, 
          SetOrder,
          PostCatalogueImages, 
          PutCatalogue} from '../actions';
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
    switchMap((action: AddCatalogue) => this.monekatService.addCatalogue(action.payload['itemDetails'])
      .pipe(
        // switchMap(response => [
        //   new UpdateCatalogue(response),
        //   // ... action.payload['from'] ? [new SetOrder({ orderDetails : [ { ...orderDetails, count: 1 }] })] : []
        // ]),
        map(response => action.payload['itemImages'].length ? new PostCatalogueImages({response, "itemImages" : action.payload['itemImages'], "from" : action.payload['itemDetails']['from']}) : new CatalogueSuccess({response, "from" : action.payload['itemDetails']['from']})),
        // tap( _ => action.payload['itemDetails']['from'] ? this.navCtrl.navigateForward('/order/add_item') : this.navCtrl.back()), //action.payload['from'] ? this.navCtrl.navigateForward('/order/order_summary') : this.navCtrl.back()),
        catchError(() => EMPTY)
      ))
    )
  );

  putCatalogue$ = createEffect(() => this.actions$.pipe(
    ofType(ECatalogueActions.PutCatalogue),
    switchMap((action: PutCatalogue) => this.monekatService.updateCatalogue(action.payload['itemDetails'])
      .pipe(
        map(response => action.payload['itemImages'].length ? new PostCatalogueImages({response, "itemImages" : action.payload['itemImages'], "from" : action.payload['itemDetails']['from']}) : new CatalogueSuccess({response, "from" : action.payload['itemDetails']['from']})),
        catchError(() => EMPTY)
      ))
    )
  );

  postItemImages$ = createEffect(() => this.actions$.pipe(
    ofType(ECatalogueActions.PostCatalogueImages),
    switchMap((action: PostCatalogueImages) => {

      let imagesFormData : Observable<any>[] = action.payload['itemImages'].map( imgBlob => {
        let formData = new FormData();
        formData.append("file", imgBlob);
        formData.append("itemId", action.payload['response']['id']);
        return this.monekatService.postFile(formData);
      })
      

      return combineLatest(imagesFormData).pipe(
        map(images => new CatalogueSuccess({...action.payload, images})),
        catchError(() => EMPTY)
      )
    })

  ))

  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ECatalogueActions.CatalogueSuccess),
    map((action: CatalogueSuccess) => {
      action.payload['from'] ? this.navCtrl.navigateForward('/order/add_item') : this.navCtrl.back();

      return new UpdateCatalogue(action.payload['response'])
    }),
    // tap( _ => {
    //   action.payload['from'] ? this.navCtrl.navigateForward('/order/add_item') : this.navCtrl.back()
    // })
  ));

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}