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
                let {id} = action.payload['response'];
                let isCatalogueExist = _.findIndex(state, {id});
                let images = (action.payload['images'] && action.payload['images'].length) ? action.payload['images'] : []

                 if(isCatalogueExist >= 0)  {
                    tempState[isCatalogueExist] = {...action.payload['response']};

                    if(images.length)  {
                        tempState[isCatalogueExist]['images'] = [...tempState[isCatalogueExist]['images'], ...images]
                    }

                    return tempState;
                }
                else {
                    return [...tempState, action.payload['response'] ]
                }
            }
            
            return [{...action.payload['response']}];
        }
        default:
            return state;
    }
}