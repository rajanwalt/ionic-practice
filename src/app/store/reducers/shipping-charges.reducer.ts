import { ShippingChargesActions, EShippingChargesActions } from '../actions';

export function ShippingChargesReducers(state:any , action: ShippingChargesActions ): any  {
    switch (action.type)  {
        case EShippingChargesActions.SetShippingCharges: {
            return action.payload
        }
        default:
            return state;
    }
}