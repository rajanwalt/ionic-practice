import { CustomersActions, ECustomersActions } from '../actions';

export function CustomersReducers(state:any , action: CustomersActions ): any  {
    switch (action.type)  {
        case ECustomersActions.SetCustomers: {
            return action.payload
        }
        default:
            return state;
    }
}