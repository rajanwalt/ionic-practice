import { LoginActions, ELoginActions } from '../actions';

export function LoginReducers(state:any , action: LoginActions ): any  {
    switch (action.type)  {
        case ELoginActions.SetUser: {
            return action.payload
        }
        case ELoginActions.UpdateAccountSuccess: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}