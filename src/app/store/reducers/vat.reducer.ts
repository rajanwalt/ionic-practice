import { VatActions, EVatActions } from '../actions';

export function VatReducers(state:any , action: VatActions ): any  {
    switch (action.type)  {
        case EVatActions.SetVat: {
            return action.payload
        }
        default:
            return state;
    }
}