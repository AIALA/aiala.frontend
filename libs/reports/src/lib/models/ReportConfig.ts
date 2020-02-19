export interface ReportConfig {
  pivotConfig: {
    showUI: boolean,
    [key: string]: any
  };
  showUnitSelector: boolean;
}

export const DefaultReportConfigs: ReportConfig[] = [{
  pivotConfig: {
    'cols': [
      'taskName'
    ],
    'rows': [
      'wasCompletedLate'
    ],
    'inclusions': {
      'activityType': [
        'TaskFeedback'
      ]
    },
    'exclusions': {
      'wasCompletedLate': [
        'null'
      ]
    },
    'showUI': false,
    'aggregatorName': 'Count',
    'rendererName': 'Stacked Bar Chart'
  },
  showUnitSelector: true
}, {
  pivotConfig: {
    'vals': [
      'percentageOfTaskLate'
    ],
    'exclusions': {
      'percentageOfTaskLate': [
        '0',
        'null'
      ]
    },
    'inclusions': {
      'activityType': [
        'TaskFeedback'
      ]
    },
    'showUI': false,
    'aggregatorName': 'Average',
    'rendererName': 'Bar Chart'
  },
  showUnitSelector: true
}, {
  pivotConfig: {
    'rows': [
      'taskFeedback'
    ],
    'exclusions': {
      'taskFeedback': [
        'null'
      ]
    },
    'showUI': false,
    'aggregatorName': 'Count',
    'rendererName': 'Stacked Bar Chart'
  },
  showUnitSelector: true
}, {
  pivotConfig: {
    'rows': [
      'activityType'
    ],
    'inclusions': {
      'activityType': [
        'EmergencyStart'
      ]
    },
    'showUI': false,
    'aggregatorName': 'Count',
    'rendererName': 'Bar Chart'
  },
  showUnitSelector: true
}, {
  pivotConfig: {
    'cols': [
      'taskName',
      'stepsCount'
    ],
    'rows': [
      'taskDuration'
    ],
    'exclusions': {
      'taskName': [
        'null'
      ]
    },
    'showUI': false,
    'sorters': {},
    'aggregatorName': 'Count',
    'rendererName': 'Scatter Chart'
  },
  showUnitSelector: false
}, {
  pivotConfig: {
    'showUI': true
  },
  showUnitSelector: false
}];
