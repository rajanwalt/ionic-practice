import { from } from 'rxjs';
import {ELoginActions} from './actions';
import { initialState } from './state';

export function clearState(reducer) {
    return function (state, action) {
  
      if (action.type === ELoginActions.Logout) {
        state = {...initialState};
      }
  
      return reducer(state, action);
    };
  }