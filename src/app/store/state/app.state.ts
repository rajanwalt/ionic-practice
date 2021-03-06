import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './../router-custom-serializer';

import { Order } from './../../order/models';
import { Shop } from './../../shop/models';
import { Catalogue, Customer } from './../../common/models';

export interface State {
    shopDetails : any;
    customers : Customer[];
    catalogue : any;
    currentOrder: Order;
    lastOrderStatus: any;
    paymentMethods: any;
    vat: any;
    user: any;
    wallet: any;
    shippingCharges: any,
    pendingRequest : number,
    settings : any,
    createAccount: any,
    listOfOrders: any,
    router?: RouterReducerState<RouterStateUrl>;
  }
  
export const initialState : State = {
    shopDetails : null,
    customers : [],
    catalogue : [],
    currentOrder : null,
    paymentMethods : [],
    vat: null,
    user: null,
    wallet : null,
    lastOrderStatus : null,
    shippingCharges : [],
    pendingRequest: 0,
    settings : null,
    createAccount : {},
    listOfOrders : []
  }