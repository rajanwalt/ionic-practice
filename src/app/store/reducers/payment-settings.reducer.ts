import { PaymentMethodsActions, EPaymentMethodsActions } from '../actions';

export function PaymentMethodsReducer(state:any , action: PaymentMethodsActions ): any  {
    switch (action.type)  {
        case EPaymentMethodsActions.SetPaymentMethods : {
            return action.payload
        }
        default:
            return state;
    }
}