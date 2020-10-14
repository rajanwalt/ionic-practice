import { State } from '../state';

export const selectUser = (state : State) => state.user

export const shippingCharges = (state) => state.charges