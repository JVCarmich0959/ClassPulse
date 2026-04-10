import { detectTimeStatus, getHourBlock, getWeekdayLabel, getWeekKey, parseIncidentDate } from './dateUtils';

const EMPTY_VALUE = 'Unknown';

function clean(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function toTitleCase(value) {
  const text = clean(value).toLowerCase();
  if (!text) return EMPTY_VALUE;
  return text
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function normalizeSpecialsName(value) {
  const text = clean(value).toLowerCase();
  if (!text) return EMPTY_VALUE;
  if (text.includes('phys') || text === 'pe' || text.includes('p.e')) return 'PE';
  if (text.includes('tech')) return 'Technology';
  if (text.includes('lib')) return 'Library';
  if (text.includes('music')) return 'Music';
  if (text.includes('art')) return 'Art';
  return toTitleCase(text);
}

export function normalizeClassName(value) {
  const text = clean(value);
  if (!text) return 'Unassigned class';
  return text.replace(/\s+/g, ' ');
}

export function normalizeStudentName(value) {
  const text = clean(value);
  if (!text) return 'Restricted-Unknown';
  if (/^restricted-/i.test(text)) return text;

  const base = text
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(-6) || 'UNK';

  return `Restricted-${base}`;
}

export function parseBehaviorList(value) {
  const text = clean(value);
  if (!text) return ['Unknown'];
  return text
    .split(/[;,|/]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => toTitleCase(item));
}

export function hasConfirmedIncidentTime(value) {
  return detectTimeStatus(value) === 'confirmed';
}

function readField(row, keys, fallback = '') {
  for (const key of keys) {
    if (row?.[key] !== undefined && row?.[key] !== null && String(row[key]).trim() !== '') {
      return row[key];
    }
  }
  return fallback;
}

export function normalizeIncidentRow(row) {
  const rawDate = readField(row, ['incidentDate', 'date', 'timestamp', 'Timestamp']);
  const parsedDate = parseIncidentDate(rawDate);
  const incidentTime = readField(row, ['incidentTime', 'time', 'timeOfIncident']);
  const behaviorRaw = readField(row, ['behavior', 'behaviors', 'behaviorType']);
  const followUp = readField(row, ['followUp', 'followup', 'actionTaken']);
  const trigger = readField(row, ['trigger', 'antecedent', 'whatHappenedBefore']);
  const homeContact = readField(row, ['homeContact', 'familyContacted', 'contactedHome']);
  const studentSupportChart = readField(row, ['chartUsed', 'supportChartUsed', 'usedChart']);

  return {
    incidentDate: parsedDate,
    weekKey: getWeekKey(parsedDate),
    dayOfWeek: getWeekdayLabel(parsedDate),
    month: parsedDate ? parsedDate.toLocaleDateString('en-US', { month: 'short' }) : 'Unknown',
    grade: clean(readField(row, ['grade', 'studentGrade'])) || 'Unknown',
    specials: normalizeSpecialsName(readField(row, ['specials', 'specialsClass', 'teacherSpecials'])),
    classroom: normalizeClassName(readField(row, ['classroom', 'className', 'teacherClassroom'])),
    studentId: normalizeStudentName(readField(row, ['student', 'studentId', 'studentName'])),
    behaviors: parseBehaviorList(behaviorRaw),
    incidentTime,
    hourBlock: getHourBlock(incidentTime),
    timeStatus: detectTimeStatus(incidentTime),
    hasConfirmedTime: hasConfirmedIncidentTime(incidentTime),
    trigger,
    followUp,
    hasTrigger: Boolean(clean(trigger)),
    hasFollowUp: Boolean(clean(followUp)),
    homeContact: /yes|y|true|1/i.test(clean(homeContact)),
    chartUsed: /yes|y|true|1/i.test(clean(studentSupportChart))
  };
}
