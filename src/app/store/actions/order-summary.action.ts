import { Action } from '@ngrx/store';

export enum EOrderSummaryActions  {
    PostOrderSummary = '[Order Summary] Post Order Summary',
    GetOrderSummary = '[Order Summary] Get Order Summary',
    UpdateOrderSummary = '[Order Summary] Update Order Summary',
    GetFinalOrderSummary = '[Order Summary] Get Final Order Summary',
}

export class PostOrderSummary implements Action {
    public readonly type = EOrderSummaryActions.PostOrderSummary;
    constructor(public payload: any)  {}
}

export class GetOrderSummary implements Action {
    public readonly type = EOrderSummaryActions.GetOrderSummary;
    constructor(public payload: any)  {}
}

export class UpdateOrderSummary implements Action {
    public readonly type = EOrderSummaryActions.UpdateOrderSummary;
    constructor(public payload: any)  {}
}

export class GetFinalOrderSummary implements Action {
    public readonly type = EOrderSummaryActions.GetFinalOrderSummary;
    constructor(public payload: any)  {}
}




export type OrderSummaryActions = PostOrderSummary | GetOrderSummary | UpdateOrderSummary | GetFinalOrderSummary ;