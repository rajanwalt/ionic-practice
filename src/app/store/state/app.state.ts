export interface State {
    shopDetails : any
    customers : any,
    catalogue : any
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
    catalogue : []
  }