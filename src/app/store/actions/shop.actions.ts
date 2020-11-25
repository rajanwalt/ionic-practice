import { Action } from '@ngrx/store';

export enum EShopActions  {
    SetShopAddress = '[Shop] Set ShopAddress',
    GetShopAddress = '[Shop] Get ShopAddress',
    SetShop = '[Shop] Set Shop',
    PostShop = '[Shop] Post Shop',
    UpdateShop = '[Shop] Update Shop',
    PostShopLogo = '[Shop] Post Shop Logo',
    GetShop = '[Shop] Get Shop',
    ShopSuccess = '[Shop] Post Shop Success',
    ShopFailed = '[Shop] Post Shop Failed'
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

export class UpdateShop implements Action {
    public readonly type = EShopActions.UpdateShop;
    constructor(public payload: any)  {}
}

export class PostShopLogo implements Action {
    public readonly type = EShopActions.PostShopLogo;
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

export class ShopFailed implements Action {
    public readonly type = EShopActions.ShopFailed;
    constructor(public payload: any)  {}
}

export type ShopActions = SetShop | SetShopAddress | GetShopAddress | PostShop | GetShop | ShopSuccess | UpdateShop |  ShopFailed;