import * as _ from 'underscore';

import { CustomersActions, ECustomersActions } from '../actions';
import { Customer } from './../../common/models';

export function CustomersReducers(state:Customer[] = [] , action: CustomersActions ): any  {
    switch (action.type)  {
        case ECustomersActions.SetCustomers: {
            return action.payload
        }
        case ECustomersActions.UpdateCustomers: {
            let tempState = state.slice(0);
            
            if(tempState && tempState.length)  {
                let {id} = action.payload;
                let isCustomerExist = _.findIndex(state, {id});
                if(isCustomerExist >= 0)  {
                    tempState[isCustomerExist] = {...action.payload};
                    return tempState;
                }
                else {
                    return [...tempState, {...action.payload} ]
                }
            }
            return [{...action.payload}];
        }
        case ECustomersActions.GetCustomer: {
            let {customerId} = action.payload;
            return state.find(customer => customerId == customer.id);
        }
        default:
            return state;
    }
}