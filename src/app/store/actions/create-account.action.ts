import { Action } from '@ngrx/store';

export enum ECreateAccountActions  {
    GetCreateAccount = '[CreateAccount] Get CreateAccount',
    SetCreateAccount = '[CreateAccount] Set CreateAccount',
    ResetCreateAccount = '[CreateAccount] Reset CreateAccount'
}

export class GetCreateAccount implements Action {
    public readonly type = ECreateAccountActions.GetCreateAccount;
    constructor(public payload: any)  {}
}

export class SetCreateAccount implements Action {
    public readonly type = ECreateAccountActions.SetCreateAccount;
    constructor(public payload: any)  {}
}

export class ResetCreateAccount implements Action {
    public readonly type = ECreateAccountActions.ResetCreateAccount;
    constructor(public payload: any)  {}
}




export type CreateAccountActions = GetCreateAccount | SetCreateAccount | ResetCreateAccount;