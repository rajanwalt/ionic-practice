import { OrderActions, EOrderActions } from '../actions';

export function OrderReducers(state:any , action: OrderActions ): any  {
    switch (action.type)  {
        case EOrderActions.SetOrder: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}