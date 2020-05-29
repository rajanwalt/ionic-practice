import { Order } from './../../order/models';
import { Shop } from './../../shop/models';
export interface State {
    shopDetails : Shop
    customers : any,
    catalogue : any,
    currentOrder: Order,
    lastOrderStatus: any
  }
  
export const initialState : State = {
    shopDetails : null,
    customers : [],
    catalogue : [],
    currentOrder : null,
    lastOrderStatus : ""
  }