import { formatWeekLabel, sortWeekKeys } from './dateUtils';

function countBy(rows, keyFn) {
  return rows.reduce((acc, row) => {
    const key = keyFn(row);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function topEntries(map, limit = Infinity) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

export function buildWeeklySeries(rows) {
  const byWeek = countBy(rows, (row) => row.weekKey || 'Unknown');
  return sortWeekKeys(Object.keys(byWeek)).map((weekKey, index) => ({
    week: weekKey === 'Unknown' ? `Wk ${index + 1}` : formatWeekLabel(weekKey),
    incidents: byWeek[weekKey]
  }));
}

export function buildGradeSummary(rows) {
  return topEntries(countBy(rows, (row) => row.grade)).map(([grade, incidents]) => ({ grade, incidents }));
}

export function buildSpecialsSummary(rows) {
  const bySpecials = rows.reduce((acc, row) => {
    const key = row.specials;
    if (!acc[key]) {
      acc[key] = { incidents: 0, days: new Set() };
    }
    acc[key].incidents += 1;
    if (row.incidentDate) {
      acc[key].days.add(row.incidentDate.toDateString());
    }
    return acc;
  }, {});

  return Object.entries(bySpecials)
    .map(([specials, summary]) => {
      const loggedDays = summary.days.size;
      const incidentsPerDay = loggedDays ? summary.incidents / loggedDays : summary.incidents;
      const coverage = Math.min(1, loggedDays / 20);
      return { specials, incidentsPerDay, coverage, loggedDays };
    })
    .sort((a, b) => b.incidentsPerDay - a.incidentsPerDay);
}

export function buildBehaviorSummary(rows) {
  const counts = {};
  rows.forEach((row) => {
    row.behaviors.forEach((behavior) => {
      counts[behavior] = (counts[behavior] || 0) + 1;
    });
  });

  return topEntries(counts).map(([behavior, incidents]) => ({ behavior, incidents }));
}

export function buildTimingSummary(rows) {
  const dowMap = countBy(rows, (row) => row.dayOfWeek || 'Unknown');
  const blockMap = countBy(rows, (row) => row.hourBlock || 'Unknown');
  const heatmapMap = countBy(rows, (row) => `${row.dayOfWeek || 'Unknown'}|${row.hourBlock || 'Unknown'}`);

  const dow = Object.entries(dowMap).map(([day, incidents]) => ({ day, incidents }));
  const timeBlocks = Object.entries(blockMap).map(([block, incidents]) => ({ block, incidents }));
  const heatmap = Object.entries(heatmapMap).map(([key, value]) => {
    const [day, hour] = key.split('|');
    return { day, hour, value };
  });

  return { dow, timeBlocks, heatmap };
}

export function buildClassroomSummary(rows) {
  const classMap = {};

  rows.forEach((row) => {
    const key = row.classroom;
    if (!classMap[key]) {
      classMap[key] = {
        name: row.classroom,
        grade: row.grade,
        incidents: 0,
        students: new Map(),
        behavior: {},
        day: {},
        specials: {},
        weekly: {}
      };
    }

    const item = classMap[key];
    item.incidents += 1;
    item.students.set(row.studentId, (item.students.get(row.studentId) || 0) + 1);
    item.day[row.dayOfWeek] = (item.day[row.dayOfWeek] || 0) + 1;
    item.specials[row.specials] = (item.specials[row.specials] || 0) + 1;
    item.weekly[row.weekKey || 'Unknown'] = (item.weekly[row.weekKey || 'Unknown'] || 0) + 1;
    row.behaviors.forEach((behavior) => {
      item.behavior[behavior] = (item.behavior[behavior] || 0) + 1;
    });
  });

  return Object.values(classMap)
    .map((item) => ({
      name: item.name,
      grade: item.grade,
      incidents: item.incidents,
      studentsFlagged: [...item.students.values()].filter((count) => count >= 2).length,
      weekly: sortWeekKeys(Object.keys(item.weekly)).map((weekKey, idx) => ({
        week: weekKey === 'Unknown' ? `Wk ${idx + 1}` : formatWeekLabel(weekKey),
        incidents: item.weekly[weekKey]
      })),
      byBehavior: topEntries(item.behavior).map(([label, value]) => ({ label, value })),
      byStudent: [...item.students.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([studentId, incidents]) => ({ studentId, incidents })),
      byDay: Object.entries(item.day).map(([day, incidents]) => ({ day, incidents })),
      bySpecials: Object.entries(item.specials).map(([label, value]) => ({ label, value }))
    }))
    .sort((a, b) => b.incidents - a.incidents);
}

export function buildStudentFollowupSummary(rows) {
  const studentMap = {};
  rows.forEach((row) => {
    if (!studentMap[row.studentId]) {
      studentMap[row.studentId] = {
        studentId: row.studentId,
        grade: row.grade,
        incidents: 0,
        confirmedTimeCount: 0,
        followupCount: 0,
        homeContactCount: 0,
        chartUseCount: 0,
        repeatsAfterContact: 0
      };
    }

    const item = studentMap[row.studentId];
    item.incidents += 1;
    if (row.hasConfirmedTime) item.confirmedTimeCount += 1;
    if (row.hasFollowUp) item.followupCount += 1;
    if (row.homeContact) {
      item.homeContactCount += 1;
      if (item.incidents > 1) item.repeatsAfterContact += 1;
    }
    if (row.chartUsed) item.chartUseCount += 1;
  });

  return Object.values(studentMap)
    .map((item) => ({
      studentId: item.studentId,
      grade: item.grade,
      incidents: item.incidents,
      timingCoverage: item.incidents ? item.confirmedTimeCount / item.incidents : 0,
      fieldCompleteness: item.incidents ? item.followupCount / item.incidents : 0,
      homeContactRate: item.incidents ? item.homeContactCount / item.incidents : 0,
      repeatsAfterContact: item.repeatsAfterContact,
      chartUseRate: item.incidents ? item.chartUseCount / item.incidents : 0,
      trend: 'flat'
    }))
    .sort((a, b) => b.incidents - a.incidents)
    .slice(0, 15);
}

export function buildCoverageSummary(rows) {
  const bySpecials = buildSpecialsSummary(rows);
  const monthlyMap = rows.reduce((acc, row) => {
    const month = row.month || 'Unknown';
    if (!acc[month]) acc[month] = { month };
    acc[month][row.specials] = (acc[month][row.specials] || 0) + 1;
    return acc;
  }, {});

  const monthly = Object.values(monthlyMap);
  const consistency = bySpecials.map((special) => ({
    team: special.specials,
    expectedDays: 20,
    loggedDays: special.loggedDays,
    completeness: special.coverage
  }));

  return { specialsNorm: bySpecials, monthly, consistency };
}

export function buildOutcomesSummary(rows) {
  const withContact = rows.filter((row) => row.homeContact).length;
  const withFollowup = rows.filter((row) => row.hasFollowUp).length;
  return {
    homeContactRate: rows.length ? withContact / rows.length : 0,
    followupRate: rows.length ? withFollowup / rows.length : 0,
    notes: 'Outcome fields are initial operational indicators and should be reviewed with intervention team context.'
  };
}

export function buildDashboardData(rows) {
  const weekly = buildWeeklySeries(rows);
  const grades = buildGradeSummary(rows);
  const behaviors = buildBehaviorSummary(rows);
  const { dow, timeBlocks, heatmap } = buildTimingSummary(rows);
  const classrooms = buildClassroomSummary(rows);
  const students = buildStudentFollowupSummary(rows);
  const { specialsNorm, monthly, consistency } = buildCoverageSummary(rows);
  const outcomes = buildOutcomesSummary(rows);

  const topClasses = classrooms.slice(0, 5).map((row) => ({ classroom: row.name, incidents: row.incidents }));
  const incidents = rows.length;
  const studentsWith4Plus = students.filter((student) => student.incidents >= 4).length;

  const dq = [
    'Specials-only logging scope: classroom incidents outside specials are not included.',
    `${Math.round((1 - rows.filter((row) => row.hasTrigger).length / Math.max(1, incidents)) * 100)}% of incident records are missing a documented trigger.`,
    `${Math.round((1 - rows.filter((row) => row.hasFollowUp).length / Math.max(1, incidents)) * 100)}% of records are missing follow-up action detail.`,
    `${Math.round((1 - rows.filter((row) => row.hasConfirmedTime).length / Math.max(1, incidents)) * 100)}% of records use inferred or missing incident time.`
  ];

  const kpis = [
    { label: 'Total incidents logged', value: incidents },
    { label: 'Students with 4+ incidents', value: studentsWith4Plus },
    { label: 'Specials logging coverage', value: `${Math.round((specialsNorm.reduce((sum, row) => sum + row.coverage, 0) / Math.max(1, specialsNorm.length)) * 100)}%` },
    { label: 'Home contact rate', value: `${Math.round(outcomes.homeContactRate * 100)}%` }
  ];

  const roadmap = [
    'Review field validation in the referral form to reduce missing trigger and follow-up values.',
    'Use weekly trend checks in team meetings to align intervention plans.',
    'Review classrooms with repeat incidents and low chart use for targeted coaching.',
    'Document intervention response notes before weekly coordination meetings.'
  ];

  return {
    kpis,
    dq,
    weekly,
    grades,
    specialsNorm,
    dow,
    behaviors,
    timeBlocks,
    heatmap,
    topClasses,
    monthly,
    consistency,
    students,
    roadmap,
    classrooms,
    outcomes
  };
}
