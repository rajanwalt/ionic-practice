import { Action } from '@ngrx/store';

export enum EShopDetailsActions  {
    SetShopDetails = '[ShopDetails] Set ShopDetails',
    AddShopDetails = '[ShopDetails] Add ShopDetails',
    GetShopDetails = '[ShopDetails] Get ShopDetails'
}

export class SetShopDetails implements Action {
    public readonly type = EShopDetailsActions.SetShopDetails;
    constructor(public payload: any)  {}
}

export class GetShopDetails implements Action {
    public readonly type = EShopDetailsActions.GetShopDetails;
    constructor(public payload: any)  {}
}

export class AddShopDetails implements Action {
    public readonly type = EShopDetailsActions.AddShopDetails;
    constructor(public payload: any)  {}
}

export type ShopDetailsActions = SetShopDetails | GetShopDetails | AddShopDetails;