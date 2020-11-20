import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EShopActions, ShopSuccess, PostShop, PostShopLogo, SetShop, PostFile, GetShop} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class ShopEffects {

  getShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.GetShop),
    switchMap((action: GetShop) => this.monekatService.getShopDetails(action.payload)
      .pipe(
        map(shopDetails => new SetShop(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.PostShop),
    switchMap((action: PostShop) => this.monekatService.postShopDetails({...action.payload['shopPayload']})
      .pipe(
        map(shopDetails => action.payload["shopLogoBlog"] ? new PostShopLogo({shopDetails, shopLogoBlog: action.payload["shopLogoBlog"]}) : new ShopSuccess(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  updateShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.UpdateShop),
    switchMap((action: PostShop) => this.monekatService.updateShopDetails({...action.payload['shopPayload']})
      .pipe(
        map(shopDetails => action.payload["shopLogoBlog"] ? new PostShopLogo({shopDetails, shopLogoBlog: action.payload["shopLogoBlog"]}) : new ShopSuccess(shopDetails)),
        catchError(() => EMPTY)
      ))
    )
  );

  postShopLogo$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.PostShopLogo),
    switchMap((action: PostShopLogo) => {
      let formData = new FormData();
      formData.append("file", action.payload['shopLogoBlog']);
      formData.append("serviceId", action.payload['shopDetails']['id']);

      return this.monekatService.postFile(formData).pipe(
        map(_ => new ShopSuccess(action.payload['shopDetails'])),
        catchError(() => EMPTY)
      )
    })

  ))

  // postShopDetails$ = createEffect(() => this.actions$.pipe(
  //   ofType(EShopActions.PostShop),
  //   switchMap((action: PostShop) => this.monekatService.postShopDetails({...action.payload['shopPayload']})
  //     .pipe(
  //       switchMap(shopDetails => [ 
  //         ... action.payload['shopLogoBlog'] ? [new PostFile({ serviceId : shopDetails['id'], itemId : '', file : action.payload['shopLogoBlog'] })] : [],
  //         new ShopSuccess(shopDetails), 
  //       ]),
  //       catchError(() => EMPTY)
  //     ))
  //   )
  // );


  // postShopDetails$ = createEffect(() => this.actions$.pipe(
  //   ofType(EShopActions.PostShop),
  //   switchMap((action: PostShop) => this.monekatService.postShopDetails({...action.payload['shopPayload']})
  //     .pipe(
  //       map( shopDetails => {
  //         if(action.payload['shopLogoBlog'])  {
  //           let formData = new FormData();

  //           formData.append("file", action.payload['shopLogoBlog']);
  //           formData.append("serviceId", shopDetails['id']);

  //           return this.monekatService.postFile(formData).pipe(map(data => new ShopSuccess({...shopDetails, ...data})))
  //         }
  //         else {
  //           return new ShopSuccess(shopDetails)
  //         }
  //       }),
  //       catchError(() => EMPTY)
  //     ))
  // ));


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