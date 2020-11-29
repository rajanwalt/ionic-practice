import { Action } from '@ngrx/store';

export enum EOrderListActions  {
    GetOrderList = '[OrderList] Get OrderList',
    OnOrderListSuccess = '[OrderList] On OrderList Success',
    SetOrderList = '[OrderList] Set OrderList',
    PostOrderList = '[OrderList] Post OrderList'
}

export class GetOrderList implements Action {
    public readonly type = EOrderListActions.GetOrderList;
    constructor(public payload: any)  {}
}

export class SetOrderList implements Action {
    public readonly type = EOrderListActions.SetOrderList;
    constructor(public payload: any)  {}
}

export class PostOrderList implements Action {
    public readonly type = EOrderListActions.PostOrderList;
    constructor(public payload: any)  {}
}

export class OnOrderListSuccess implements Action {
    public readonly type = EOrderListActions.OnOrderListSuccess;
    constructor(public payload: any)  {}
}


export type OrderListActions = GetOrderList | SetOrderList | PostOrderList | OnOrderListSuccess;