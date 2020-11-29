import { CreateAccountActions, ECreateAccountActions } from '../actions';

export function CreateAccountReducers(state:any = {} , action: CreateAccountActions ): any  {
    switch (action.type)  {
        case ECreateAccountActions.SetCreateAccount: {
            return {...state, ...action.payload }
        }
        default:
            return state;
    }
}