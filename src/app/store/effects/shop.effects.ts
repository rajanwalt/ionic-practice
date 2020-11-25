import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, throwError } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { MonekatService } from '../../APIs';

import { EShopActions, ShopSuccess, PostShop, PostShopLogo, SetShop, PostFile, GetShop, ShopFailed} from '../actions';
import { NavController } from '@ionic/angular';

@Injectable()
export class ShopEffects {

  getShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.GetShop),
    switchMap((action: GetShop) => this.monekatService.getShopDetails(action.payload)
      .pipe(
        map(shopDetails => new SetShop(shopDetails)),
        catchError((error) => EMPTY)
      ))
    )
  );

  postShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.PostShop),
    switchMap((action: PostShop) => this.monekatService.postShopDetails({...action.payload['shopPayload']})
      .pipe(
        map(shopDetails => action.payload["shopLogoBlog"] ? new PostShopLogo({shopDetails, shopLogoBlog: action.payload["shopLogoBlog"]}) : new ShopSuccess(shopDetails)),
        catchError((error) => of(new ShopFailed(error)))
      ))
    )
  );

  updateShopDetails$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.UpdateShop),
    switchMap((action: PostShop) => this.monekatService.updateShopDetails({...action.payload['shopPayload']})
      .pipe(
        map(shopDetails => action.payload["shopLogoBlog"] ? new PostShopLogo({shopDetails, shopLogoBlog: action.payload["shopLogoBlog"]}) : new ShopSuccess(shopDetails)),
        catchError((error) => of(new ShopFailed(error)))
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
        map( shopImage => {
          let payload = {...action.payload['shopDetails']};
          if(payload['images'])  {
            payload['images'].push(shopImage)
          }
          else {
            payload['images'] = [shopImage]
          }
          
          return new ShopSuccess(payload)
        }),
        catchError((error) => of(new ShopFailed(error)))
      )
    })

  ))


  onSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.ShopSuccess),
    map((action: ShopSuccess) => new SetShop(action.payload)),
    tap( _ => {
      this.navCtrl.back();
    })
  ));

  onFailed$ = createEffect(() => this.actions$.pipe(
    ofType(EShopActions.ShopFailed),
    map((action: ShopFailed) => throwError(action.payload))), 
    {
     dispatch: false 
    }
  )

  constructor(
    private actions$: Actions,
    private monekatService: MonekatService,
    private navCtrl: NavController
  ) {}
}