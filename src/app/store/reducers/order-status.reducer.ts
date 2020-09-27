import { OrderStatusActions, EOrderStatusActions } from '../actions';

export function OrderStatusReducers(state:any , action: OrderStatusActions ): any  {
    switch (action.type)  {
        case EOrderStatusActions.SetOrderStatus: {
            return action.payload
        }
        case EOrderStatusActions.OnUpdateCustomer: {
            return { ...state , ...action.payload }
        }
        case EOrderStatusActions.OnSelectDeliveryMethod: {
            let selectedDeliveryMethod = action.payload
            let deliveryMethod = JSON.parse(JSON.stringify(state['deliveryMethod']));
            
            deliveryMethod.forEach(value => {
                if(selectedDeliveryMethod['type'] == value['type'])  {
                    value['status'] = "selected"
                }
            })
            return {...state, ...{deliveryMethod}}

        }
        case EOrderStatusActions.OnSelectPaymentMethod: {
            let selectedDeliveryMethod = action.payload
            let paymentType = JSON.parse(JSON.stringify(state['paymentType']));
            
            paymentType.forEach(value => {
                if(selectedDeliveryMethod['type'] == value['type'])  {
                    value['status'] = "selected"
                }
            })
            return {...state, ...{paymentType}}

        }
        default:
            return state;
    }
}