import { Action } from '@ngrx/store';

export enum EWalletActions  {
    GetWallet = '[Wallet] Get Wallet',
    OnWalletSuccess = '[Wallet] On Wallet Success',
    SetWallet = '[Wallet] Set Wallet',
    PostWallet = '[Wallet] Post Wallet'
}

export class GetWallet implements Action {
    public readonly type = EWalletActions.GetWallet;
    constructor(public payload: any)  {}
}

export class SetWallet implements Action {
    public readonly type = EWalletActions.SetWallet;
    constructor(public payload: any)  {}
}

export class PostWallet implements Action {
    public readonly type = EWalletActions.PostWallet;
    constructor(public payload: any)  {}
}

export class OnWalletSuccess implements Action {
    public readonly type = EWalletActions.OnWalletSuccess;
    constructor(public payload: any)  {}
}


export type WalletActions = GetWallet | SetWallet | PostWallet | OnWalletSuccess;