import * as _ from 'underscore';

import { CustomersActions, ECustomersActions } from '../actions';
import { Customer } from './../../common/models';

export function CustomersReducers(state:Customer[] = [] , action: CustomersActions ): any  {
    switch (action.type)  {
        case ECustomersActions.SetCustomers: {
            return action.payload
        }
        case ECustomersActions.UpdateCustomers: {
            let {id} = action.payload;
            let tempState = state.slice(0);

            let isCustomerExist = _.findIndex(state, {id});
            if(isCustomerExist >= 0)  {
                tempState[isCustomerExist] = action.payload;
                return tempState;
            }
            
            return tempState.push(action.payload);
        }
        case ECustomersActions.GetCustomer: {
            let {customerId} = action.payload;
            return state.find(customer => customerId == customer.id);
        }
        default:
            return state;
    }
}