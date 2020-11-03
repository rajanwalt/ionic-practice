import { Action } from '@ngrx/store';

export enum EFileActions  {
    GetFile = '[File] Get File',
    OnFileSuccess = '[File] On Order Success',
    SetFile = '[File] Set File',
    PostFile = '[File] Post File'
}

export class GetFile implements Action {
    public readonly type = EFileActions.GetFile;
    constructor(public payload: any)  {}
}

export class SetFile implements Action {
    public readonly type = EFileActions.SetFile;
    constructor(public payload: any)  {}
}

export class PostFile implements Action {
    public readonly type = EFileActions.PostFile;
    constructor(public payload: any)  {}
}

export class OnFileSuccess implements Action {
    public readonly type = EFileActions.OnFileSuccess;
    constructor(public payload: any)  {}
}


export type FileActions = GetFile | SetFile | PostFile | OnFileSuccess;