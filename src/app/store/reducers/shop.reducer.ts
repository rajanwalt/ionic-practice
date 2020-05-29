import { ShopActions, EShopActions } from '../actions';

export function ShopReducers(state:any , action: ShopActions ): any  {
    switch (action.type)  {
        case EShopActions.SetShop : {
            return action.payload
        }
        case EShopActions.SetShopAddress: {
            return { ...state, ...action.payload }
        }
        default:
            return state;
    }
}