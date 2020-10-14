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
import { PaymentMethodsReducer } from './payment-settings.reducer';
import { VatReducers } from './vat.reducer';
import { LoginReducers } from './login.reducer';
import { WalletReducers } from './wallet.reducer';
import { ShippingChargesReducers } from './shipping-charges.reducer';
import { PendingRequestsReducers } from './pending-request.reducer';
import { clearState } from './../clear-state';

  export const reducers: ActionReducerMap<State> = {
    shopDetails : ShopReducers,
    customers : CustomersReducers,
    catalogue: CatalogueReducers,
    currentOrder : OrderReducers,
    lastOrderStatus : OrderStatusReducers,
    paymentMethods : PaymentMethodsReducer,
    vat: VatReducers,
    user: LoginReducers,
    wallet : WalletReducers,
    shippingCharges : ShippingChargesReducers,
    pendingRequest : PendingRequestsReducers,
    router: routerReducer
  };
  
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [clearState] : [];
  