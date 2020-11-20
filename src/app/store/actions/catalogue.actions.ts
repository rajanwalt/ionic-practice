import { Action } from '@ngrx/store';
import { Catalogue } from './../../common/models';

export enum ECatalogueActions  {
    SetCatalogue = '[Catalogue] Set Catalogue',
    AddCatalogue = '[Catalogue] Add Catalogue',
    GetCatalogue = '[Catalogue] Get Catalogue',
    PutCatalogue = '[Catalogue] Put Catalogue',
    UpdateCatalogue = '[Catalogue] Update Catalogue',
    CatalogueSuccess = '[Catalogue] Catalogue Success',
    CatalogueFailure = '[Catalogue] Catalogue Failure',
    PostCatalogueImages = '[Catalogue] Post Catalogue images',
}

export class SetCatalogue implements Action {
    public readonly type = ECatalogueActions.SetCatalogue;
    constructor(public payload: any)  {}
}

export class GetCatalogue implements Action {
    public readonly type = ECatalogueActions.GetCatalogue;
    constructor(public payload: any)  {}
}

export class PutCatalogue implements Action {
    public readonly type = ECatalogueActions.PutCatalogue;
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

export class PostCatalogueImages implements Action {
    public readonly type = ECatalogueActions.PostCatalogueImages;
    constructor(public payload: any)  {}
}

export type CatalogueActions = SetCatalogue | GetCatalogue | AddCatalogue | UpdateCatalogue | CatalogueSuccess | CatalogueFailure | PostCatalogueImages | PutCatalogue;