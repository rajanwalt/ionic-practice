import { Action } from '@ngrx/store';

export enum EVatActions  {
    GetVat = '[VAT] Get VAT',
    OnVatSuccess = '[VAT] On Order Success',
    SetVat = '[VAT] Set VAT',
    PostVat = '[VAT] Post VAT'
}

export class GetVat implements Action {
    public readonly type = EVatActions.GetVat;
    constructor(public payload: any)  {}
}

export class SetVat implements Action {
    public readonly type = EVatActions.SetVat;
    constructor(public payload: any)  {}
}

export class PostVat implements Action {
    public readonly type = EVatActions.PostVat;
    constructor(public payload: any)  {}
}

export class OnVatSuccess implements Action {
    public readonly type = EVatActions.OnVatSuccess;
    constructor(public payload: any)  {}
}


export type VatActions = GetVat | SetVat | PostVat | OnVatSuccess;