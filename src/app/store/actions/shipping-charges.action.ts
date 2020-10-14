import { Action } from '@ngrx/store';

export enum EShippingChargesActions  {
    GetShippingCharges = '[ShippingCharges] Get ShippingCharges',
    OnShippingChargesSuccess = '[ShippingCharges] On ShippingCharges Success',
    SetShippingCharges = '[ShippingCharges] Set ShippingCharges',
    PostShippingCharges = '[ShippingCharges] Post ShippingCharges'
}

export class GetShippingCharges implements Action {
    public readonly type = EShippingChargesActions.GetShippingCharges;
    constructor(public payload: any)  {}
}

export class SetShippingCharges implements Action {
    public readonly type = EShippingChargesActions.SetShippingCharges;
    constructor(public payload: any)  {}
}

export class PostShippingCharges implements Action {
    public readonly type = EShippingChargesActions.PostShippingCharges;
    constructor(public payload: any)  {}
}

export class OnShippingChargesSuccess implements Action {
    public readonly type = EShippingChargesActions.OnShippingChargesSuccess;
    constructor(public payload: any)  {}
}


export type ShippingChargesActions = GetShippingCharges | SetShippingCharges | PostShippingCharges | OnShippingChargesSuccess;