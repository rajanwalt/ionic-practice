import { Action } from '@ngrx/store';

export enum EWalletActions  {
    GetWallet = '[Wallet] Get Wallet',
    OnWalletSuccess = '[Wallet] On Wallet Success',
    SetWallet = '[Wallet] Set Wallet',
    ReleaseWallet = '[Wallet] Post Wallet'
}

export class GetWallet implements Action {
    public readonly type = EWalletActions.GetWallet;
    constructor(public payload: any)  {}
}

export class SetWallet implements Action {
    public readonly type = EWalletActions.SetWallet;
    constructor(public payload: any)  {}
}

export class ReleaseWallet implements Action {
    public readonly type = EWalletActions.ReleaseWallet;
    constructor(public payload: any)  {}
}

export class OnWalletSuccess implements Action {
    public readonly type = EWalletActions.OnWalletSuccess;
    constructor(public payload: any)  {}
}


export type WalletActions = GetWallet | SetWallet | ReleaseWallet | OnWalletSuccess;