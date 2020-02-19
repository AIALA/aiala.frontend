import { Injectable } from '@angular/core';
import { Culture } from '../models/Culture';

@Injectable()
export class I18nUtilityService {
  private static readonly storageCultureKey = 'aiala.uiCulture';

  navigateToLanguage(newLanguage: string): void {
    newLanguage = newLanguage.toLowerCase();
    const cultures = Object.keys(Culture).map(key => Culture[key]);

    // Only persist valid culture, in order to avoid invalid redirect
    if (cultures.indexOf(newLanguage) !== -1) {
      this.persistCulture(newLanguage);
    }

    window.location.href = window.location.href
      .toLowerCase()
      .replace(new RegExp(`\/(${cultures.join('|')})[/]{0,1}`, 'g'), `/${newLanguage}/`);
  }

  persistCulture(newCulture: string): void {
    localStorage.setItem(I18nUtilityService.storageCultureKey, newCulture.toLowerCase());
  }

  getCulture(): string {
    return localStorage.getItem(I18nUtilityService.storageCultureKey);
  }
}
