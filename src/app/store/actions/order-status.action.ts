import { Action } from '@ngrx/store';

export enum EOrderStatusActions  {
    GetOrderStatus = '[Order Status] Get Order Status',
    OnOrderSuccess = '[Order Status] On Order Success',
    SetOrderStatus = '[Order Status] Set Order Status'
}

export class GetOrderStatus implements Action {
    public readonly type = EOrderStatusActions.GetOrderStatus;
    constructor(public payload: any)  {}
}

export class SetOrderStatus implements Action {
    public readonly type = EOrderStatusActions.SetOrderStatus;
    constructor(public payload: any)  {}
}

export class OnOrderSuccess implements Action {
    public readonly type = EOrderStatusActions.OnOrderSuccess;
    constructor(public payload: any)  {}
}


export type OrderStatusActions = GetOrderStatus | SetOrderStatus | OnOrderSuccess;