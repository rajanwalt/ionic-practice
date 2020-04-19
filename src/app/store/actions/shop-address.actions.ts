import { Action } from '@ngrx/store';

export enum EShopAddressActions  {
    SetShopAddress = '[ShopAddress] Set ShopAddress',
    GetShopAddress = '[ShopAddress] Get ShopAddress'
}

export class SetShopAddress implements Action {
    public readonly type = EShopAddressActions.SetShopAddress;
    constructor(public payload: any)  {}
}

export class GetShopAddress implements Action {
    public readonly type = EShopAddressActions.GetShopAddress;
    constructor(public payload: any)  {}
}

export type ShopAddressActions = SetShopAddress | GetShopAddress;