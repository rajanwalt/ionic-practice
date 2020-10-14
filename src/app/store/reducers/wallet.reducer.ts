import { WalletActions, EWalletActions } from '../actions';

export function WalletReducers(state:any , action: WalletActions ): any  {
    switch (action.type)  {
        case EWalletActions.SetWallet: {
            return action.payload
        }
        default:
            return state;
    }
}