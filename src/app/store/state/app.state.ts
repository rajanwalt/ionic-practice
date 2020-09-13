import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './../router-custom-serializer';

import { Order } from './../../order/models';
import { Shop } from './../../shop/models';
import { Catalogue, Customer } from './../../common/models';
export interface State {
    shopDetails : Shop
    customers : Customer[],
    catalogue : Catalogue[],
    currentOrder: Order,
    lastOrderStatus: any,
    router?: RouterReducerState<RouterStateUrl>;
  }
  
export const initialState : State = {
    shopDetails : null,
    customers : [],
    catalogue : [],
    currentOrder : null,
    lastOrderStatus : null,
    
  }