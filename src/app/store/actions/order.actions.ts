import { Action } from '@ngrx/store';

export enum EOrderActions  {
    SetOrder = '[Order] Set Order',
    AddOrder = '[Order] Add Order',
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

export class AddOrder implements Action {
    public readonly type = EOrderActions.AddOrder;
    constructor(public payload: any)  {}
}

export type OrderActions = SetOrder | GetOrder | AddOrder;