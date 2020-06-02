import { OrderActions, EOrderActions } from '../actions';
import { Order } from './../../order/models';

export function OrderReducers(state:Order , action: OrderActions ): any  {
    switch (action.type)  {
        case EOrderActions.SetOrder: {
            return {...state, ...action.payload};
        }
        case EOrderActions.ResetOrder: {
            return action.payload;
        }
        case EOrderActions.AddOrderDetails: {
            if(state.orderDetails)  {

                let orderDetails = [...state.orderDetails, ...action.payload['orderDetails']];

                return { ...state, ...{ orderDetails } };
            }
            return {...state, ...action.payload};
        }
        default:
            return state;
    }
}