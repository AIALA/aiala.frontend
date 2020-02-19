export interface ReportActivity {
  id: string;
  activityType: string;
  activityData: string;
  date: string;
  timeOfDay: string;
  dayOfWeek: string;
  dayName: string;
  taskName: string;
  taskDuration: string;
  percentageOfTaskPassed: number | null;
  stepsCount: number | null;
  averageStepTextLength: number | null;
}
