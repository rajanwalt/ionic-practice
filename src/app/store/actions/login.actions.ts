import { Action } from '@ngrx/store';

export enum ELoginActions  {
    Login = '[Login] Get Login Details',
    CreateAccount = '[Login] Create Account',
    CreateAccountSuccess = '[Login] Create Account Success',
    LoginSuccess = '[Login] Login Success',
    SetUser = '[Login] Set User',
    Logout = '[Login] Logout',
    UpdateAccount = '[Login] Update Account',
    UpdateAccountSuccess = '[Login] Update Account Success'

}

export class Login implements Action {
    public readonly type = ELoginActions.Login;
    constructor(public payload: any)  {}
}

export class CreateAccount implements Action {
    public readonly type = ELoginActions.CreateAccount;
    constructor(public payload: any)  {}
}


export class CreateAccountSuccess implements Action {
    public readonly type = ELoginActions.CreateAccountSuccess;
    constructor(public payload: any)  {}
}

export class LoginSuccess implements Action {
    public readonly type = ELoginActions.LoginSuccess;
    constructor(public payload: any)  {}
}

export class SetUser implements Action {
    public readonly type = ELoginActions.SetUser;
    constructor(public payload: any)  {}
}

export class Logout implements Action {
    public readonly type = ELoginActions.Logout;
}

export class UpdateAccount implements Action {
    public readonly type = ELoginActions.UpdateAccount;
    constructor(public payload: any)  {}
}

export class UpdateAccountSuccess implements Action {
    public readonly type = ELoginActions.UpdateAccountSuccess;
    constructor(public payload: any)  {}
}

export type LoginActions = Login | CreateAccount |  CreateAccountSuccess | LoginSuccess | SetUser | Logout | UpdateAccount | UpdateAccountSuccess;