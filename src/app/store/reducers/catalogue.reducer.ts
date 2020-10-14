import * as _ from 'underscore';

import { CatalogueActions, ECatalogueActions } from '../actions';
import { Catalogue } from './../../common/models';

export function CatalogueReducers(state, action: CatalogueActions ): any  {
    switch (action.type)  {
        case ECatalogueActions.SetCatalogue: {
            return action.payload
        }
        case ECatalogueActions.UpdateCatalogue: {
            let tempState =  state.slice(0);
            
            if(tempState && tempState.length)  {
                let {id} = action.payload;
                let isCatalogueExist = _.findIndex(state, {id});
                 if(isCatalogueExist >= 0)  {
                    tempState[isCatalogueExist] = {...action.payload};
                    return tempState;
                }
            }
            
            return [{...action.payload}];
        }
        default:
            return state;
    }
}