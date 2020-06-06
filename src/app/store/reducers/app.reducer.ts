import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { environment } from '../../../environments/environment';
  
import { State } from './../state';
import { ShopReducers } from './shop.reducer';
import { CustomersReducers } from './customers.reducer';
import { CatalogueReducers } from './catalogue.reducer';
import { OrderReducers } from './order.reducer';
import { OrderStatusReducers } from './order-status.reducer';


  export const reducers: ActionReducerMap<State> = {
    shopDetails : ShopReducers,
    customers : CustomersReducers,
    catalogue: CatalogueReducers,
    currentOrder : OrderReducers,
    lastOrderStatus : OrderStatusReducers,
    router: routerReducer
  };
  
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
  