import { OrderListActions, EOrderListActions } from '../actions';

export function OrderListReducers(state:any , action: OrderListActions ): any  {
    switch (action.type)  {
        case EOrderListActions.SetOrderList: {
            return action.payload
        }
        default:
            return state;
    }
}