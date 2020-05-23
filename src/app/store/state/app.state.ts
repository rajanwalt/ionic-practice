import { Order } from './order.state';

export interface State {
    shopDetails : any
    customers : any,
    catalogue : any,
    currentOrder: Order
  }
  
export const initialState : State = {
    shopDetails : {
      shopName : "",
      email: "",
      // website: "",
      shopdetails: "",
      country: "",
      city: "",
      street: ""
    },
    customers : [],
    catalogue : [],
    currentOrder : {}
  }