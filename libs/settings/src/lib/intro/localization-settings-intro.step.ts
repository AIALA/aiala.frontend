import { Injectable } from '@angular/core';
import { IntroStep } from '@xpdo/core/xdk';
import { Actions, ofType } from '@ngrx/effects';
import { LocalizationSettingsFacade } from '../+state/localization-settings.facade';
import { LocalizationSettingsActionTypes, GetLocalizationSettingsSuccessAction } from '../+state/localization-settings.actions';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LocalizationSettingsStep extends IntroStep {
  constructor(
    private actions: Actions,
    private facade: LocalizationSettingsFacade
  ) {
    super();
  }

  start(): Promise<void> {
    this.facade.loadSettings();
    return new Promise(
      (resolve): void => {
        this.actions
          .pipe(
            ofType<GetLocalizationSettingsSuccessAction>(LocalizationSettingsActionTypes.GetLocalizationSettingsSuccess),
            take(1)
          )
          .subscribe(() => {
            resolve();
          });
      }
    );
  }

  canActivate(): Observable<boolean> {
    return this.facade.localizationSettings$.pipe(
      map(value => !!value)
    );
  }
}
