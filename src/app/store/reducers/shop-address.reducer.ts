import { ShopAddressActions, EShopAddressActions } from '../actions';

export function ShopAddressReducers(state:any , action: ShopAddressActions ): any  {
    switch (action.type)  {
        case EShopAddressActions.SetShopAddress: {
            return action.payload
        }
        default:
            return state;
    }
}