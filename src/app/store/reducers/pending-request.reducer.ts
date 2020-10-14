import { PendingRequestsActions, EPendingRequestsActions } from '../actions';

export function PendingRequestsReducers(state:any , action: PendingRequestsActions ): any  {
    switch (action.type)  {
        case EPendingRequestsActions.IncrementRequest: {
            return state + 1
        }
        case EPendingRequestsActions.DecrementRequest: {
            return Math.max(state - 1, 0)
        }
        default:
            return state;
    }
}