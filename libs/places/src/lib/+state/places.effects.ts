import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { PlacesApiService } from '../services/places-api.service';
import { GetPlacesAction, PlacesActionTypes, GetPlacesSuccessAction, GetPlacesErrorAction, SavePlaceAction, SavePlaceErrorAction, SavePlaceSuccessAction, DeletePlaceAction, DeletePlaceSuccessAction, DeletePlaceErrorAction } from './places.actions';
import { map, exhaustMap, catchError, tap, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PlacesEffects {
  @Effect()
  getPlaces$ = this.actions$.pipe(
    ofType<GetPlacesAction>(PlacesActionTypes.GetPlaces),
    exhaustMap(() =>
      this.api.getPlaces().pipe(
        map(places => new GetPlacesSuccessAction(places)),
        catchError(error => of(new GetPlacesErrorAction(error)))
      )
    )
  );

  @Effect()
  savePlace$ = this.actions$.pipe(
    ofType<SavePlaceAction>(PlacesActionTypes.SavePlace),
    switchMap(action =>
      this.api.savePlace(action.payload).pipe(
        map(place => new SavePlaceSuccessAction(place)),
        catchError(error => of(new SavePlaceErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  saveTaskSuccess$: Observable<any> = this.actions$.pipe(
    ofType<SavePlaceSuccessAction>(PlacesActionTypes.SavePlaceSuccess),
    tap((action: SavePlaceSuccessAction) =>
      this.router.navigate(['/places/edit/' + action.payload.id], { replaceUrl: true })
    )
  );

  @Effect()
  deletePlace$ = this.actions$.pipe(
    ofType<DeletePlaceAction>(PlacesActionTypes.DeletePlace),
    switchMap(action =>
      this.api.deletePlace(action.payload).pipe(
        map(() => new DeletePlaceSuccessAction(action.payload)),
        catchError(error => of (new DeletePlaceErrorAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private api: PlacesApiService,
    private router: Router
  ) {}
}
