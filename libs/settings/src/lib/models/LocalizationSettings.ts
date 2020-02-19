import { Duration } from 'luxon';
import { Culture } from '@msft-aiala/shared';

interface LocalizationSettingsBase {
  tenantCulture: Culture;
}

export interface LocalizationSettingsModel extends LocalizationSettingsBase {
  timeZoneOffset: string;
}

export interface LocalizationSettings extends LocalizationSettingsBase {
  timeZoneOffset: Duration;
}
