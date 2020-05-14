import { Action } from '@ngrx/store';

export enum ECustomersActions  {
    SetCustomers = '[Customers] Set Customers',
    AddCustomers = '[Customers] Add Customers',
    GetCustomers = '[Customers] Get Customers'
}

export class SetCustomers implements Action {
    public readonly type = ECustomersActions.SetCustomers;
    constructor(public payload: any)  {}
}

export class GetCustomers implements Action {
    public readonly type = ECustomersActions.GetCustomers;
    constructor(public payload: any)  {}
}

export class AddCustomers implements Action {
    public readonly type = ECustomersActions.AddCustomers;
    constructor(public payload: any)  {}
}

export type CustomersActions = SetCustomers | GetCustomers | AddCustomers;