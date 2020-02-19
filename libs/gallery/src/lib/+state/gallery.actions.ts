import { Action } from '@ngrx/store';
import { UpdateAiPictureMetadataModel } from '../models/UpdateAiPictureMetadataModel';
import { Picture } from '@msft-aiala/picture';

export enum GalleryActionTypes {
  GetGallery = '[Gallery] Get Gallery',
  GetGallerySuccess = '[Gallery] Get Gallery Success',
  GetGalleryError = '[Gallery] Get Gallery Error',

  SavePicture = '[Gallery] Save Picture',
  SavePictureSuccess = '[Gallery] Save Picture Success',
  SavePictureError = '[Gallery] Save Picture Error',

  DeletePicture = '[Gallery] Delete Picture',
  DeletePictureSuccess = '[Gallery] Delete Picture Success',
  DeletePictureError = '[Gallery] Delete Picture Error',
}

export class GetGalleryAction implements Action {
  type = GalleryActionTypes.GetGallery;
  constructor() {}
}

export class GetGallerySuccessAction implements Action {
  type = GalleryActionTypes.GetGallerySuccess;
  constructor(public payload: Picture[]) {}
}

export class GetGalleryErrorAction implements Action {
  type = GalleryActionTypes.GetGalleryError;
  constructor(public payload: any) {}
}

export class SavePictureAction implements Action {
  type = GalleryActionTypes.SavePicture;
  constructor(public payload: { id: string, model: UpdateAiPictureMetadataModel}) {}
}

export class SavePictureSuccessAction implements Action {
  type = GalleryActionTypes.SavePictureSuccess;
  constructor(public payload: Picture) {}
}

export class SavePictureErrorAction implements Action {
  type = GalleryActionTypes.SavePictureError;
  constructor(public payload: any) {}
}

export class DeletePictureAction implements Action {
  type = GalleryActionTypes.DeletePicture;
  constructor(public payload: string) {}
}

export class DeletePictureSuccessAction implements Action {
  type = GalleryActionTypes.DeletePictureSuccess;
  constructor(public payload: string) {}
}

export class DeletePictureErrorAction implements Action {
  type = GalleryActionTypes.DeletePictureError;
  constructor(public payload: any) {}
}

export type GalleryAction =
  | GetGalleryAction
  | GetGallerySuccessAction
  | GetGalleryErrorAction
  | SavePictureAction
  | SavePictureSuccessAction
  | SavePictureErrorAction
  | DeletePictureAction
  | DeletePictureSuccessAction
  | DeletePictureErrorAction;
