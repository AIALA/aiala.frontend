import { Duration, DateTime } from 'luxon';

export class ScheduleEditableConfig {
  constructor(dayDate: DateTime, timeZoneOffset: Duration) {
    if ((window as any).steamrollerMode) {
      // Always in future => no restrictions
      dayDate = DateTime.utc().plus(Duration.fromObject({days: 7}));
    }

    this.dayDate = dayDate;
    const today = DateTime.utc().plus(timeZoneOffset).startOf('day');
    const dateDiff = dayDate.diff(today).valueOf();
    this.isToday = dateDiff === 0;
    this.isPast = dateDiff < 0;
    this.isPastOrToday = this.isToday || this.isPast;
    this.timeZoneOffset = timeZoneOffset;
  }

  private readonly dayDate: DateTime;
  readonly isToday: boolean;
  readonly isPast: boolean;
  readonly isPastOrToday: boolean;
  readonly timeZoneOffset: Duration;

  getEarliestEditableTime(): Duration {
    const now = DateTime.utc().plus(this.timeZoneOffset);

    if (now.day < this.dayDate.day) {
      return Duration.fromObject({
        hour: 0
      });
    }
    if (now.day > this.dayDate.day) {
      return Duration.fromObject({
        hour: 24
      });
    }

    return Duration.fromObject({
      hour: now.hour,
      minute: now.minute + 5
    });
  }
}
