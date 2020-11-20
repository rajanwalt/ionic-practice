import { Action } from '@ngrx/store';

export enum ESettingsActions  {
    GetSettings = '[Settings] Get Settings',
    OnSettingsSuccess = '[Settings] On Order Success',
    SetSettings = '[Settings] Set Settings',
    PostSettings = '[Settings] Post Settings'
}

export class GetSettings implements Action {
    public readonly type = ESettingsActions.GetSettings;
    constructor(public payload: any)  {}
}

export class SetSettings implements Action {
    public readonly type = ESettingsActions.SetSettings;
    constructor(public payload: any)  {}
}

export class PostSettings implements Action {
    public readonly type = ESettingsActions.PostSettings;
    constructor(public payload: any)  {}
}

export class OnSettingsSuccess implements Action {
    public readonly type = ESettingsActions.OnSettingsSuccess;
    constructor(public payload: any)  {}
}


export type SettingsActions = GetSettings | SetSettings | PostSettings | OnSettingsSuccess;