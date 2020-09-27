import { State } from '../state';
import { Cart } from './../../order/models';

export const selectLastOrder = (state : State) => state.lastOrderStatus && Cart.formatAPI(state.lastOrderStatus)