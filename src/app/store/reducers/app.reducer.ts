import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';

import { environment } from '../../../environments/environment';
  
import { State } from './../state';
import { ShopAddressReducers } from './shop-address.reducer';
import { CustomersReducers } from './customers.reducer';
import { CatalogueReducers } from './catalogue.reducer';
import { OrderReducers } from './order.reducer';
  
  export const reducers: ActionReducerMap<State> = {
    shopDetails : ShopAddressReducers,
    customers : CustomersReducers,
    catalogue: CatalogueReducers,
    currentOrder : OrderReducers
  };
  
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
  