import { Duration } from 'luxon';

interface TimeZoneBase {
  id: string;
  displayName: string;
}

export interface TimeZoneModel extends TimeZoneBase {
  offset: string;
}

export interface TimeZone extends TimeZoneBase {
  offset: Duration;
}
