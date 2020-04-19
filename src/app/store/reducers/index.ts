import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { ShopAddressReducers } from './shop-address.reducer';

export interface State {
  shopDetails : any
}

export const initialState : State = {
  shopDetails : {
    shopName : "",
    email: "",
    website: "",
    shopdetails: "",
    country: "",
    city: "",
    street: ""
  }
}

export const reducers: ActionReducerMap<State> = {
  shopDetails : ShopAddressReducers
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
