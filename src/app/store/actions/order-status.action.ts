import { Action } from '@ngrx/store';

export enum EOrderStatusActions  {
    GetOrderStatus = '[Order Status] Get Order Status',
    OnOrderSuccess = '[Order Status] On Order Success',
    SetOrderStatus = '[Order Status] Set Order Status',
    OnUpdateCustomer = '[Order Status] On Update Customer',
    OnSelectDeliveryMethod = '[Order Status] On Select Delivery Method',
    OnSelectPaymentMethod = '[Order Status] On Select Payment Method',
    OnUpdateOrderItems = '[Order Status] On UPdate Order Items',
    ResetOrderStatus = '[Order Status] Reset Order Status',
    Checkout = '[Order Summary] Checkout'

}

export class GetOrderStatus implements Action {
    public readonly type = EOrderStatusActions.GetOrderStatus;
    constructor(public payload: any)  {}
}

export class SetOrderStatus implements Action {
    public readonly type = EOrderStatusActions.SetOrderStatus;
    constructor(public payload: any)  {}
}

export class ResetOrderStatus implements Action {
    public readonly type = EOrderStatusActions.ResetOrderStatus;
}

export class OnOrderSuccess implements Action {
    public readonly type = EOrderStatusActions.OnOrderSuccess;
    constructor(public payload: any)  {}
}

export class OnUpdateCustomer implements Action {
    public readonly type = EOrderStatusActions.OnUpdateCustomer;
    constructor(public payload: any)  {}
}

export class OnSelectDeliveryMethod implements Action {
    public readonly type = EOrderStatusActions.OnSelectDeliveryMethod;
    constructor(public payload: any)  {}
}

export class OnSelectPaymentMethod implements Action {
    public readonly type = EOrderStatusActions.OnSelectPaymentMethod;
    constructor(public payload: any)  {}
}

export class OnUpdateOrderItems implements Action {
    public readonly type = EOrderStatusActions.OnUpdateOrderItems;
    constructor(public payload: any)  {}
}

export class Checkout implements Action {
    public readonly type = EOrderStatusActions.Checkout;
    constructor(public payload: any)  {}
}



export type OrderStatusActions = GetOrderStatus | SetOrderStatus | ResetOrderStatus | OnOrderSuccess | OnUpdateCustomer | OnSelectDeliveryMethod | OnSelectPaymentMethod | OnUpdateOrderItems | Checkout;