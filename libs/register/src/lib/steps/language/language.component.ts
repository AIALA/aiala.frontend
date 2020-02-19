import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Registration } from '../../models/Registration';
import { Observable } from 'rxjs';
import { RegisterFacade } from '../../+state/register.facade';
import { MatSelectChange } from '@angular/material';
import { I18nUtilityService } from '@msft-aiala/shared';

@Component({
  selector: 'msft-aiala-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  registration$: Observable<Registration>;

  constructor(
    @Inject(LOCALE_ID) public localeId: string,
    private facade: RegisterFacade,
    private i18nUtility: I18nUtilityService
    ) { }

  ngOnInit() {
    this.registration$ = this.facade.registration$;
  }

  onLocaleChange(event: MatSelectChange): any {
    this.i18nUtility.navigateToLanguage(event.value);
  }

  submit(): void {
    this.facade.updateRegistration({
      culture: this.localeId
    });
  }
}
