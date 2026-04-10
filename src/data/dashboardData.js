export const kpis = [
  { label: 'Total incidents logged', value: 184 },
  { label: 'Students with 4+ incidents', value: 9 },
  { label: 'Specials logging coverage', value: '81%' },
  { label: 'Home contact rate', value: '46%' }
];

export const dq = [
  'Specials-only logging scope: classroom incidents outside specials are not included.',
  '17% of incident records are missing a documented trigger.',
  '12% of records are missing follow-up action detail.',
  'Some classes had no logging activity for at least one week this quarter.'
];

export const weekly = [
  { week: 'Wk 1', incidents: 23 },
  { week: 'Wk 2', incidents: 28 },
  { week: 'Wk 3', incidents: 31 },
  { week: 'Wk 4', incidents: 22 },
  { week: 'Wk 5', incidents: 25 },
  { week: 'Wk 6', incidents: 19 },
  { week: 'Wk 7', incidents: 18 },
  { week: 'Wk 8', incidents: 18 }
];

export const grades = [
  { grade: 'K', incidents: 16 },
  { grade: '1', incidents: 24 },
  { grade: '2', incidents: 38 },
  { grade: '3', incidents: 35 },
  { grade: '4', incidents: 41 },
  { grade: '5', incidents: 30 }
];

export const specialsNorm = [
  { specials: 'Art', incidentsPerDay: 2.4, coverage: 0.84 },
  { specials: 'Music', incidentsPerDay: 1.8, coverage: 0.79 },
  { specials: 'PE', incidentsPerDay: 2.9, coverage: 0.91 },
  { specials: 'Library', incidentsPerDay: 1.3, coverage: 0.73 },
  { specials: 'Technology', incidentsPerDay: 2.1, coverage: 0.82 }
];

export const dow = [
  { day: 'Mon', incidents: 37 },
  { day: 'Tue', incidents: 41 },
  { day: 'Wed', incidents: 35 },
  { day: 'Thu', incidents: 43 },
  { day: 'Fri', incidents: 28 }
];

export const behaviors = [
  { behavior: 'Off-task refusal', incidents: 47 },
  { behavior: 'Peer conflict', incidents: 41 },
  { behavior: 'Disruption', incidents: 39 },
  { behavior: 'Elopement', incidents: 18 },
  { behavior: 'Unsafe hands/body', incidents: 22 },
  { behavior: 'Property misuse', incidents: 17 }
];

export const timeBlocks = [
  { block: '8:00-9:00', incidents: 18 },
  { block: '9:00-10:00', incidents: 27 },
  { block: '10:00-11:00', incidents: 36 },
  { block: '11:00-12:00', incidents: 29 },
  { block: '12:00-1:00', incidents: 21 },
  { block: '1:00-2:00', incidents: 31 },
  { block: '2:00-3:00', incidents: 22 }
];

export const heatmap = [
  { day: 'Mon', hour: '8-9', value: 2 },
  { day: 'Mon', hour: '9-10', value: 7 },
  { day: 'Mon', hour: '10-11', value: 10 },
  { day: 'Mon', hour: '11-12', value: 8 },
  { day: 'Mon', hour: '1-2', value: 6 },
  { day: 'Tue', hour: '8-9', value: 5 },
  { day: 'Tue', hour: '9-10', value: 9 },
  { day: 'Tue', hour: '10-11', value: 12 },
  { day: 'Tue', hour: '11-12', value: 8 },
  { day: 'Tue', hour: '1-2', value: 7 },
  { day: 'Wed', hour: '8-9', value: 3 },
  { day: 'Wed', hour: '9-10', value: 7 },
  { day: 'Wed', hour: '10-11', value: 9 },
  { day: 'Wed', hour: '11-12', value: 7 },
  { day: 'Wed', hour: '1-2', value: 6 },
  { day: 'Thu', hour: '8-9', value: 6 },
  { day: 'Thu', hour: '9-10', value: 10 },
  { day: 'Thu', hour: '10-11', value: 13 },
  { day: 'Thu', hour: '11-12', value: 9 },
  { day: 'Thu', hour: '1-2', value: 8 },
  { day: 'Fri', hour: '8-9', value: 4 },
  { day: 'Fri', hour: '9-10', value: 6 },
  { day: 'Fri', hour: '10-11', value: 8 },
  { day: 'Fri', hour: '11-12', value: 6 },
  { day: 'Fri', hour: '1-2', value: 4 }
];

export const topClasses = [
  { classroom: '4A - Chen', incidents: 16 },
  { classroom: '3C - Ortiz', incidents: 14 },
  { classroom: '2B - Hall', incidents: 13 },
  { classroom: '5A - Brooks', incidents: 12 },
  { classroom: '1D - Morgan', incidents: 10 }
];

export const monthly = [
  { month: 'Sep', Art: 8, Music: 7, PE: 10, Library: 5, Technology: 9 },
  { month: 'Oct', Art: 9, Music: 8, PE: 12, Library: 6, Technology: 10 },
  { month: 'Nov', Art: 7, Music: 6, PE: 9, Library: 5, Technology: 8 },
  { month: 'Dec', Art: 6, Music: 5, PE: 8, Library: 4, Technology: 7 },
  { month: 'Jan', Art: 5, Music: 5, PE: 7, Library: 3, Technology: 6 }
];

export const consistency = [
  { team: 'Art', expectedDays: 85, loggedDays: 71, completeness: 0.83 },
  { team: 'Music', expectedDays: 85, loggedDays: 67, completeness: 0.79 },
  { team: 'PE', expectedDays: 85, loggedDays: 77, completeness: 0.91 },
  { team: 'Library', expectedDays: 85, loggedDays: 62, completeness: 0.73 },
  { team: 'Technology', expectedDays: 85, loggedDays: 70, completeness: 0.82 }
];

export const students = [
  {
    studentId: 'Restricted-101',
    grade: '4',
    incidents: 8,
    timingCoverage: 0.88,
    fieldCompleteness: 0.76,
    homeContactRate: 0.63,
    repeatsAfterContact: 4,
    chartUseRate: 0.91,
    trend: 'declining'
  },
  {
    studentId: 'Restricted-212',
    grade: '3',
    incidents: 7,
    timingCoverage: 0.84,
    fieldCompleteness: 0.71,
    homeContactRate: 0.42,
    repeatsAfterContact: 3,
    chartUseRate: 0.27,
    trend: 'flat'
  },
  {
    studentId: 'Restricted-334',
    grade: '2',
    incidents: 6,
    timingCoverage: 0.73,
    fieldCompleteness: 0.68,
    homeContactRate: 0.58,
    repeatsAfterContact: 5,
    chartUseRate: 0.78,
    trend: 'flat'
  },
  {
    studentId: 'Restricted-407',
    grade: '5',
    incidents: 5,
    timingCoverage: 0.79,
    fieldCompleteness: 0.66,
    homeContactRate: 0.35,
    repeatsAfterContact: 2,
    chartUseRate: 0.19,
    trend: 'rising'
  },
  {
    studentId: 'Restricted-512',
    grade: '1',
    incidents: 4,
    timingCoverage: 0.69,
    fieldCompleteness: 0.74,
    homeContactRate: 0.21,
    repeatsAfterContact: 3,
    chartUseRate: 0.81,
    trend: 'rising'
  }
];

export const roadmap = [
  'Standardize trigger field options across specials forms.',
  'Add required validation for follow-up action before submission.',
  'Map classroom referral history into weekly dashboard trend view.',
  'Connect to Google Sheets source and add daily refresh status.',
  'Add exportable grade-level summary for team meetings.'
];

export const classrooms = [
  {
    name: '4A - Chen',
    grade: '4',
    incidents: 16,
    studentsFlagged: 3,
    weekly: weekly,
    byBehavior: [
      { label: 'Disruption', value: 5 },
      { label: 'Peer conflict', value: 4 },
      { label: 'Off-task refusal', value: 3 },
      { label: 'Unsafe hands/body', value: 2 },
      { label: 'Property misuse', value: 2 }
    ],
    byStudent: [
      { studentId: 'Restricted-101', incidents: 8 },
      { studentId: 'Restricted-650', incidents: 4 },
      { studentId: 'Restricted-773', incidents: 4 }
    ],
    byDay: dow,
    bySpecials: [
      { label: 'Art', value: 3 },
      { label: 'Music', value: 2 },
      { label: 'PE', value: 5 },
      { label: 'Library', value: 2 },
      { label: 'Technology', value: 4 }
    ]
  },
  {
    name: '3C - Ortiz',
    grade: '3',
    incidents: 14,
    studentsFlagged: 2,
    weekly: [
      { week: 'Wk 1', incidents: 2 },
      { week: 'Wk 2', incidents: 3 },
      { week: 'Wk 3', incidents: 2 },
      { week: 'Wk 4', incidents: 1 },
      { week: 'Wk 5', incidents: 2 },
      { week: 'Wk 6', incidents: 2 },
      { week: 'Wk 7', incidents: 1 },
      { week: 'Wk 8', incidents: 1 }
    ],
    byBehavior: [
      { label: 'Peer conflict', value: 5 },
      { label: 'Off-task refusal', value: 3 },
      { label: 'Disruption', value: 3 },
      { label: 'Elopement', value: 1 },
      { label: 'Unsafe hands/body', value: 2 }
    ],
    byStudent: [
      { studentId: 'Restricted-212', incidents: 7 },
      { studentId: 'Restricted-418', incidents: 4 },
      { studentId: 'Restricted-501', incidents: 3 }
    ],
    byDay: dow,
    bySpecials: [
      { label: 'Art', value: 2 },
      { label: 'Music', value: 2 },
      { label: 'PE', value: 4 },
      { label: 'Library', value: 3 },
      { label: 'Technology', value: 3 }
    ]
  },
  {
    name: '1A - Walker',
    grade: '1',
    incidents: 0,
    studentsFlagged: 0,
    weekly: [],
    byBehavior: [],
    byStudent: [],
    byDay: [],
    bySpecials: []
  }
];
