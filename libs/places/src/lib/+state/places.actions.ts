import { Action } from '@ngrx/store';
import { Place } from '../models/Place';
import { HttpErrorResponse } from '@angular/common/http';

export enum PlacesActionTypes {
  GetPlaces = '[Places] Get Places',
  GetPlacesSuccess = '[Places] Get Places Success',
  GetPlacesError = '[Places] Get Places Error',

  SavePlace = '[Places] Save Place',
  SavePlaceSuccess = '[Places] Save Place Success',
  SavePlaceError = '[Places] Save Place Error',

  DeletePlace = '[Places] Delete Place',
  DeletePlaceSuccess = '[Places] Delete Place Success',
  DeletePlaceError = '[Places] Delete Place Error',
}

export class GetPlacesAction implements Action {
  type = PlacesActionTypes.GetPlaces;
  constructor() {}
}

export class GetPlacesSuccessAction implements Action {
  type = PlacesActionTypes.GetPlacesSuccess;
  constructor(public payload: Place[]) {}
}

export class GetPlacesErrorAction implements Action {
  type = PlacesActionTypes.GetPlacesError;
  constructor(public payload: HttpErrorResponse) {}
}

export class SavePlaceAction implements Action {
  type = PlacesActionTypes.SavePlace;
  constructor(public payload: Place) {}
}

export class SavePlaceSuccessAction implements Action {
  type = PlacesActionTypes.SavePlaceSuccess;
  constructor(public payload: Place) {}
}

export class SavePlaceErrorAction implements Action {
  type = PlacesActionTypes.SavePlaceError;
  constructor(public payload: HttpErrorResponse) {}
}

export class DeletePlaceAction implements Action {
  type = PlacesActionTypes.DeletePlace;
  constructor(public payload: string) {}
}

export class DeletePlaceSuccessAction implements Action {
  type = PlacesActionTypes.DeletePlaceSuccess;
  constructor(public payload: string) {}
}

export class DeletePlaceErrorAction implements Action {
  type = PlacesActionTypes.DeletePlaceError;
  constructor(public payload: HttpErrorResponse) {}
}

export type PlacesAction =
  | GetPlacesAction
  | GetPlacesSuccessAction
  | GetPlacesErrorAction
  | SavePlaceAction
  | SavePlaceSuccessAction
  | SavePlaceErrorAction
  | DeletePlaceAction
  | DeletePlaceSuccessAction
  | DeletePlaceErrorAction;
