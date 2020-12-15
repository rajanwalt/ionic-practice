import { State } from '../state';

export const selectUser = (state : State) => state.user

export const shippingCharges = (state) => state.charges

export const selectSetting = (state) => state.settings

export const selectCurrency = (state : State) => (state.user && state.user['currencycode']) ? state.user['currencycode'] : 'USD' 