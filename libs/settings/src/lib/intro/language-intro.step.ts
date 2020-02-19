import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { IntroStep } from '@xpdo/core/xdk';
import { LocalizationSettingsFacade } from '../+state/localization-settings.facade';
import { I18nUtilityService, Culture } from '@msft-aiala/shared';
import { take, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class LanguageStep extends IntroStep {
  private _hasRun = false;

  constructor(
    private facade: LocalizationSettingsFacade,
    private i18n: I18nUtilityService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    super();
  }

  start(): Promise<void> {
    this._hasRun = true;
    const currentCulture = this.i18n.getCulture() as Culture;
    if (currentCulture) {
      this.redirectIfDifferentCulture(currentCulture);
      return Promise.resolve();
    }

    return new Promise(
      (resolve): void => {
        this.facade.localizationSettings$.pipe(
          filter(value => !!value),
          take(1)
        ).subscribe(localizationSettings => {
          this.i18n.persistCulture(localizationSettings.tenantCulture);
            this.redirectIfDifferentCulture(localizationSettings.tenantCulture);
            resolve();
        });
      }
    );
  }

  canActivate(): Observable<boolean> {
    return of(this._hasRun);
  }

  private redirectIfDifferentCulture(selectedCulture: Culture): void {
    if (selectedCulture !== this.locale.toLocaleLowerCase()) {
      this.i18n.navigateToLanguage(selectedCulture);
    }
    return;
  }
}
