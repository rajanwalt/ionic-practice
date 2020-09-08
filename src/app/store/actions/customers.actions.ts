import { Action } from '@ngrx/store';
import { Customer } from './../../common/models';

export enum ECustomersActions  {
    SetCustomers = '[Customers] Set Customers',
    AddCustomers = '[Customers] Add Customers',
    GetCustomers = '[Customers] Get Customers',
    GetCustomer = '[Customers] Get Customer',
    UpdateCustomers = '[Customers] Update Customers',
    CustomerSuccess = '[Customers] Customer Add Success',
}

export class SetCustomers implements Action {
    public readonly type = ECustomersActions.SetCustomers;
    constructor(public payload: any)  {}
}

export class GetCustomers implements Action {
    public readonly type = ECustomersActions.GetCustomers;
    constructor(public payload: any)  {}
}

export class GetCustomer implements Action {
    public readonly type = ECustomersActions.GetCustomer;
    constructor(public payload: any)  {}
}

export class AddCustomers implements Action {
    public readonly type = ECustomersActions.AddCustomers;
    constructor(public payload: any)  {}
}

export class UpdateCustomers implements Action {
    public readonly type = ECustomersActions.UpdateCustomers;
    constructor(public payload: Customer)  {}
}

export class CustomerSuccess implements Action {
    public readonly type = ECustomersActions.CustomerSuccess;
    constructor(public payload: any)  {}
}

export type CustomersActions = SetCustomers | GetCustomers | AddCustomers | UpdateCustomers | CustomerSuccess |GetCustomer;