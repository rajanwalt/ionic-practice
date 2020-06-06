import * as _ from 'underscore';

import { CustomersActions, ECustomersActions } from '../actions';
import { Customer } from './../../common/models';

export function CustomersReducers(state:Customer[] = [] , action: CustomersActions ): any  {
    switch (action.type)  {
        case ECustomersActions.SetCustomers: {
            return action.payload
        }
        case ECustomersActions.UpdateCustomers: {
            let {customerId} = action.payload;
            let tempState = state.slice(0);

            let isCatalogueExist = _.findIndex(state, {customerId});
            if(isCatalogueExist >= 0)  {
                tempState[isCatalogueExist] = {...action.payload};
                return tempState;
            }
            
            return tempState.push(action.payload);
        }
        default:
            return state;
    }
}