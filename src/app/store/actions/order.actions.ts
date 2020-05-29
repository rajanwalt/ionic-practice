import { Action } from '@ngrx/store';

export enum EOrderActions  {
    SetOrder = '[Order] Set Order',
    AddOrderDetails = '[Order] Add Order Details',
    GetOrder = '[Order] Get Order'
}

export class SetOrder implements Action {
    public readonly type = EOrderActions.SetOrder;
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

export type OrderActions = SetOrder | GetOrder | AddOrderDetails;