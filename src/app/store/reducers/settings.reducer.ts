import { SettingsActions, ESettingsActions } from '../actions';

export function SettingsReducers(state:any , action: SettingsActions ): any  {
    switch (action.type)  {
        case ESettingsActions.SetSettings: {
            if(action.payload && action.payload.hasOwnProperty('item')) {
                return action.payload['item']
            }
            return action.payload
        }
        default:
            return state;
    }
}