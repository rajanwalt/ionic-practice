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
        case EOrderStatusActions.OnUpdateOrderItems: {
            let updatedDeliveryItems= action.payload;
            let orderItems = JSON.parse(JSON.stringify(state['orderItems']));

            orderItems.forEach(extValue => {
                updatedDeliveryItems.every(upValue => {
                    if(extValue['item_id'] == upValue['item_id'])  {
                        extValue['quantity'] = upValue['count'];
                        return false;
                    }
                    return true;
                });
            });

            return {...state, orderItems}

        }
        default:
            return state;
    }
}