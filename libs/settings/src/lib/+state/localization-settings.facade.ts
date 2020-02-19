import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { LocalizationSettings } from '../models/LocalizationSettings';
import { GetLocalizationSettingsAction } from './localization-settings.actions';
import { LocalizationSettingsPartialState } from './localization-settings.reducer';
import { localizationSettingsQuery } from './localization-settings.selectors';

@Injectable()
export class LocalizationSettingsFacade {
  localizationSettings$: Observable<LocalizationSettings> = this.store.pipe(select(localizationSettingsQuery.getLocalizationSettings));
  loading$: Observable<boolean> = this.store.pipe(select(localizationSettingsQuery.getLoading));
  saving$: Observable<boolean> = this.store.pipe(select(localizationSettingsQuery.getSaving));

  constructor(
    private store: Store<LocalizationSettingsPartialState>
  ) { }

  loadSettings(): void {
    this.store.dispatch(new GetLocalizationSettingsAction());
  }
}
