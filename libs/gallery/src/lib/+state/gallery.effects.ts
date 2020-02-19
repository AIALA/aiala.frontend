import { DeletePictureAction, GalleryActionTypes, DeletePictureSuccessAction, DeletePictureErrorAction, SavePictureSuccessAction, SavePictureErrorAction, SavePictureAction, GetGalleryAction, GetGallerySuccessAction, GetGalleryErrorAction } from './gallery.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { exhaustMap, switchMap, tap, map, catchError } from 'rxjs/operators';
import { GalleryApiService } from '../services/gallery-api.service';

@Injectable()
export class GalleryEffects {
  @Effect()
  getGallery$ = this.actions$.pipe(
    ofType<GetGalleryAction>(GalleryActionTypes.GetGallery),
    exhaustMap(() =>
      this.api.getGallery().pipe(
        map(gallery => new GetGallerySuccessAction(gallery)),
        catchError(error => of(new GetGalleryErrorAction(error)))
      )
    )
  );

  @Effect()
  savePicture$ = this.actions$.pipe(
    ofType<SavePictureAction>(GalleryActionTypes.SavePicture),
    switchMap(action =>
      this.api.savePicture(action.payload.id, action.payload.model).pipe(
        map(picture => new SavePictureSuccessAction(picture)),
        catchError(error => of(new SavePictureErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  savePictureSuccess$: Observable<any> = this.actions$.pipe(
    ofType<SavePictureSuccessAction>(GalleryActionTypes.SavePictureSuccess),
    tap((action: SavePictureSuccessAction) =>
      this.router.navigate(['/gallery/edit/' + action.payload.id], { replaceUrl: true })
    )
  );

  @Effect()
  deletePicture$ = this.actions$.pipe(
    ofType<DeletePictureAction>(GalleryActionTypes.DeletePicture),
    switchMap(action =>
      this.api.deletePicture(action.payload).pipe(
        map(() => new DeletePictureSuccessAction(action.payload)),
        catchError(error => of(new DeletePictureErrorAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private api: GalleryApiService,
    private router: Router
  ) {}
}
