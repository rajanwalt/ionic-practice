import { Action } from '@ngrx/store';
import { Catalogue } from './../../common/models';

export enum ECatalogueActions  {
    SetCatalogue = '[Catalogue] Set Catalogue',
    AddCatalogue = '[Catalogue] Add Catalogue',
    GetCatalogue = '[Catalogue] Get Catalogue',
    UpdateCatalogue = '[Catalogue] Update Catalogue',
    CatalogueSuccess = '[Catalogue] Catalogue Success',
    CatalogueFailure = '[Catalogue] Catalogue Failure',
}

export class SetCatalogue implements Action {
    public readonly type = ECatalogueActions.SetCatalogue;
    constructor(public payload: any)  {}
}

export class GetCatalogue implements Action {
    public readonly type = ECatalogueActions.GetCatalogue;
    constructor(public payload: any)  {}
}

export class UpdateCatalogue implements Action {
    public readonly type = ECatalogueActions.UpdateCatalogue;
    constructor(public payload: Catalogue)  {}
}

export class AddCatalogue implements Action {
    public readonly type = ECatalogueActions.AddCatalogue;
    constructor(public payload: any)  {}
}
export class CatalogueSuccess implements Action {
    public readonly type = ECatalogueActions.CatalogueSuccess;
    constructor(public payload: any)  {}
}

export class CatalogueFailure implements Action {
    public readonly type = ECatalogueActions.CatalogueFailure;
    constructor(public payload: any)  {}
}

export type CatalogueActions = SetCatalogue | GetCatalogue | AddCatalogue | UpdateCatalogue | CatalogueSuccess | CatalogueFailure;