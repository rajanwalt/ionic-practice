import { Action } from '@ngrx/store';

export enum EShopActions  {
    SetShopAddress = '[Shop] Set ShopAddress',
    GetShopAddress = '[Shop] Get ShopAddress',
    SetShop = '[Shop] Set Shop',
    PostShop = '[Shop] Post Shop',
    GetShop = '[Shop] Get Shop',
    ShopSuccess = '[Shop] Post Shop Success',
}

export class SetShopAddress implements Action {
    public readonly type = EShopActions.SetShopAddress;
    constructor(public payload: any)  {}
}

export class GetShopAddress implements Action {
    public readonly type = EShopActions.GetShopAddress;
    constructor(public payload: any)  {}
}

export class SetShop implements Action {
    public readonly type = EShopActions.SetShop;
    constructor(public payload: any)  {}
}

export class PostShop implements Action {
    public readonly type = EShopActions.PostShop;
    constructor(public payload: any)  {}
}

export class GetShop implements Action {
    public readonly type = EShopActions.GetShop;
    constructor(public payload: any)  {}
}

export class ShopSuccess implements Action {
    public readonly type = EShopActions.ShopSuccess;
    constructor(public payload: any)  {}
}

export type ShopActions = SetShop | SetShopAddress | GetShopAddress | PostShop | GetShop | ShopSuccess;