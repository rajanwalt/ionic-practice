import { State } from './../state';

export const selectShopDetails = (state : State) => state.shopDetails

export const selectCurrencyCode = (state : State) => state.shopDetails['currencyCode'] || 'USD'

