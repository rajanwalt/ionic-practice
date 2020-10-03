import { State } from '../state';
import { Cart } from './../../common/models';

export const selectLastOrder = (state : State) => state.lastOrderStatus && Cart.formatAPI(state.lastOrderStatus)