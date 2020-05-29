import { OrderStatusActions, EOrderStatusActions } from '../actions';

export function OrderStatusReducers(state:any , action: OrderStatusActions ): any  {
    switch (action.type)  {
        case EOrderStatusActions.SetOrderStatus: {
            return action.payload
        }
        default:
            return state;
    }
}