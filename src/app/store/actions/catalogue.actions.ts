import { Action } from '@ngrx/store';

export enum ECatalogueActions  {
    SetCatalogue = '[Catalogue] Set Catalogue',
    AddCatalogue = '[Catalogue] Add Catalogue',
    GetCatalogue = '[Catalogue] Get Catalogue'
}

export class SetCatalogue implements Action {
    public readonly type = ECatalogueActions.SetCatalogue;
    constructor(public payload: any)  {}
}

export class GetCatalogue implements Action {
    public readonly type = ECatalogueActions.GetCatalogue;
    constructor(public payload: any)  {}
}

export class AddCatalogue implements Action {
    public readonly type = ECatalogueActions.AddCatalogue;
    constructor(public payload: any)  {}
}

export type CatalogueActions = SetCatalogue | GetCatalogue | AddCatalogue;