import * as _ from 'underscore';

import { CatalogueActions, ECatalogueActions } from '../actions';
import { Catalogue } from './../../common/models';

export function CatalogueReducers(state:Catalogue[] = [], action: CatalogueActions ): any  {
    switch (action.type)  {
        case ECatalogueActions.SetCatalogue: {
            return action.payload
        }
        case ECatalogueActions.UpdateCatalogue: {
            let {itemId} = action.payload;
            let tempState = state.slice(0);

            let isCatalogueExist = _.findIndex(state, {itemId});
            if(isCatalogueExist >= 0)  {
                tempState[isCatalogueExist] = {...action.payload};
                return tempState;
            }
            
            return tempState.push(action.payload);
        }
        default:
            return state;
    }
}