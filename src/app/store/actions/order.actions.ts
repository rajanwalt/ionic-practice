import { Action } from '@ngrx/store';

export enum EOrderActions  {
    SetOrder = '[Order] Set Order',
    ResetOrder = '[Order] Reset Order',
    AddOrderDetails = '[Order] Add Order Details',
    AddOrderShipmentOptions = '[Order] Add Order Shipment Options',
    GetOrder = '[Order] Get Order'
}

export class SetOrder implements Action {
    public readonly type = EOrderActions.SetOrder;
    constructor(public payload: any)  {}
}

export class ResetOrder implements Action {
    public readonly type = EOrderActions.ResetOrder;
    constructor(public payload: any)  {}
}

export class GetOrder implements Action {
    public readonly type = EOrderActions.GetOrder;
    constructor(public payload: any)  {}
}

export class AddOrderDetails implements Action {
    public readonly type = EOrderActions.AddOrderDetails;
    constructor(public payload: any)  {}
}

export class AddOrderShipmentOptions implements Action {
    public readonly type = EOrderActions.AddOrderShipmentOptions;
    constructor(public payload: any) {}
}

export type OrderActions = SetOrder | GetOrder | AddOrderDetails | ResetOrder | AddOrderShipmentOptions;