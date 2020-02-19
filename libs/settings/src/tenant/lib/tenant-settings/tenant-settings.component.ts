import { Component, OnInit, OnDestroy } from '@angular/core';
import { TenantSettings } from '../../../lib/models/TenantSettings';
import { TenantSettingsFacade } from '@xpdo/core/xdk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable, merge, of } from 'rxjs';
import { CanComponentDeactivateBase, Culture } from '@msft-aiala/shared';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'msft-aiala-tenant-settings',
  templateUrl: './tenant-settings.component.html',
  styleUrls: ['./tenant-settings.component.scss']
})
export class TenantSettingsComponent extends CanComponentDeactivateBase implements OnInit, OnDestroy {
  settings$ = this.facade.settings$;
  isSaving$ = this.facade.isSaving$;
  loading$ = this.facade.isLoading$;
  emergencyTextBadPreview$: Observable<string>;
  emergencyTextImprovingPreview$: Observable<string>;

  culture = Culture;

  form: FormGroup;
  settingsSub: Subscription;

  constructor(
    private facade: TenantSettingsFacade<TenantSettings>,
    private formBuilder: FormBuilder
  ) {
    super();
    this.createForms();
  }

  ngOnInit(): void {
    this.facade.loadSettings();

    this.settingsSub = this.settings$.pipe(
      filter(settings => !!settings)
    ).subscribe((settings: TenantSettings) => {
      this.form.markAsPristine();
      this.form.patchValue(settings);

      this.emergencyTextBadPreview$ = merge(
        this.form.controls['emergencyTextBad'].valueChanges,
        of(settings.emergencyTextBad)
      ).pipe(
        map(this.generateEmergencyTextPreview.bind(this))
      );
      this.emergencyTextImprovingPreview$ = merge(
        this.form.controls['emergencyTextImproving'].valueChanges,
        of(settings.emergencyTextImproving)
      ).pipe(
        map(this.generateEmergencyTextPreview.bind(this))
      );
    });
  }

  ngOnDestroy(): void {
    if (this.settingsSub) {
      this.settingsSub.unsubscribe();
    }
  }

  canDeactivate(): boolean {
    return this.form.pristine;
  }

  generateEmergencyTextPreview(value: string): string {
    if (!value) {
      return '';
    }

    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#039;'
    };
    value = value.replace(new RegExp('[&<>"\']', 'g'), m => escapeMap[m]);

    const regex = '\\[(.+)\\]\\((.+)\\)';
    let match = value.match(regex);
    while (match != null && match.length === 3) {
      value = value.replace(match[0], `<a href="${match[2]}" target="_blank">${match[1]}</a>`);
      match = value.match(regex);
    }

    return value;
  }

  save(): void {
    this.facade.saveSettings(this.form.value);
  }

  createForms(): void {
    this.form = this.formBuilder.group({
      emergencyContact1Id: [''],
      emergencyContact2Id: [''],
      place1Id: [''],
      place2Id: [''],
      emergencyTextBad: [''],
      emergencyTextImproving: [''],
      timeZoneId: ['', Validators.required],
      tenantCulture: ['en-us', Validators.required]
    });
  }
}
