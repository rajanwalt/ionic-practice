import { CatalogueActions, ECatalogueActions } from '../actions';

export function CatalogueReducers(state:any , action: CatalogueActions ): any  {
    switch (action.type)  {
        case ECatalogueActions.SetCatalogue: {
            return action.payload
        }
        default:
            return state;
    }
}