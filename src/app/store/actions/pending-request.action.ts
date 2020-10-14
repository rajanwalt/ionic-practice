import { Action } from '@ngrx/store';

export enum EPendingRequestsActions  {
    IncrementRequest = '[PendingRequests] IncrementRequest',
    DecrementRequest = '[PendingRequests] DecrementRequest'
}

export class IncrementRequest implements Action {
    public readonly type = EPendingRequestsActions.IncrementRequest;
    constructor()  {}
}

export class DecrementRequest implements Action {
    public readonly type = EPendingRequestsActions.DecrementRequest;
    constructor()  {}
}


export type PendingRequestsActions = IncrementRequest | DecrementRequest;