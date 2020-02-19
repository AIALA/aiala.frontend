import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { CodesApiService } from '../services/codes-api.service';
import { GetTimeZonesAction, TimeZonesActionTypes, GetTimeZonesSuccessAction, GetTimeZonesErrorAction } from './time-zones.actions';
import { of } from 'rxjs';

@Injectable()
export class TimeZonesEffects {
  @Effect()
  getGallery$ = this.actions$.pipe(
    ofType<GetTimeZonesAction>(TimeZonesActionTypes.GetTimeZones),
    exhaustMap(() =>
      this.api.getTimeZones().pipe(
        map(zones => new GetTimeZonesSuccessAction(zones)),
        catchError(error => of(new GetTimeZonesErrorAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private api: CodesApiService
  ) {}
}
