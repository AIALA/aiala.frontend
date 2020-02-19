import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  GetLocalizationSettingsAction,
  LocalizationSettingsActionTypes,
  GetLocalizationSettingsSuccessAction,
  GetLocalizationSettingsErrorAction
} from './localization-settings.actions';
import { SettingsApiService } from '../services/settings-api.service';

@Injectable()
export class LocalizationSettingsEffects {
  @Effect()
  getLocalizationSettings$ = this.actions$.pipe(
    ofType<GetLocalizationSettingsAction>(LocalizationSettingsActionTypes.GetLocalizationSettings),
    exhaustMap(() =>
      this.api.getLocalizationSettings().pipe(
        map(settings => new GetLocalizationSettingsSuccessAction(settings)),
        catchError(error => of(new GetLocalizationSettingsErrorAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private api: SettingsApiService
  ) {}
}
