import { Action } from '@ngrx/store';

export enum EPaymentMethodsActions  {
    GetPaymentMethods = '[Payment Methods] Get PaymentMethods',
    OnPaymentMethodsSuccess = '[Payment Methods] On PaymentMethods Success',
    SetPaymentMethods = '[Payment Methods] Set PaymentMethods',
    UpdatePaymentMethods = '[Payment Methods] Update PaymentMethods'
}

export class GetPaymentMethods implements Action {
    public readonly type = EPaymentMethodsActions.GetPaymentMethods;
    constructor(public payload: any)  {}
}

export class SetPaymentMethods implements Action {
    public readonly type = EPaymentMethodsActions.SetPaymentMethods;
    constructor(public payload: any)  {}
}

export class UpdatePaymentMethods implements Action {
    public readonly type = EPaymentMethodsActions.UpdatePaymentMethods;
    constructor(public payload: any)  {}
}

export class OnPaymentMethodsSuccess implements Action {
    public readonly type = EPaymentMethodsActions.OnPaymentMethodsSuccess;
    constructor(public payload: any)  {}
}


export type PaymentMethodsActions = GetPaymentMethods | SetPaymentMethods | UpdatePaymentMethods | OnPaymentMethodsSuccess;