const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function parseIncidentDate(value) {
  if (!value && value !== 0) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;

  const text = String(value).trim();
  if (!text) return null;

  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) return parsed;

  const slashMatch = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slashMatch) {
    const [, m, d, y] = slashMatch;
    const fullYear = y.length === 2 ? `20${y}` : y;
    const local = new Date(Number(fullYear), Number(m) - 1, Number(d));
    if (!Number.isNaN(local.getTime())) return local;
  }

  return null;
}

export function getWeekKey(date) {
  if (!date) return null;
  const instance = date instanceof Date ? date : parseIncidentDate(date);
  if (!instance) return null;

  const start = new Date(instance);
  const day = start.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(start.getDate()).padStart(2, '0');
  return `${year}-${month}-${dayOfMonth}`;
}

export function formatWeekLabel(weekKey) {
  const date = parseIncidentDate(weekKey);
  if (!date) return 'Unknown week';
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  return `${month} ${date.getDate()}`;
}

export function sortWeekKeys(keys) {
  return [...keys].sort((a, b) => {
    const aDate = parseIncidentDate(a)?.getTime() ?? 0;
    const bDate = parseIncidentDate(b)?.getTime() ?? 0;
    return aDate - bDate;
  });
}

export function getWeekdayLabel(value) {
  const date = parseIncidentDate(value);
  if (!date) return 'Unknown';
  return WEEKDAY[date.getDay()] ?? 'Unknown';
}

export function detectTimeStatus(value) {
  if (value === null || value === undefined) return 'missing';
  const text = String(value).trim();
  if (!text) return 'missing';
  const inferred = /unknown|approx|estimate|inferred|about|around|n\/a/i.test(text);
  return inferred ? 'inferred' : 'confirmed';
}

export function getHourBlock(value) {
  const text = String(value ?? '').trim();
  if (!text) return 'Unknown';

  const match = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
  if (!match) return 'Unknown';

  let hour = Number(match[1]);
  const suffix = (match[3] || '').toLowerCase();

  if (suffix === 'pm' && hour < 12) hour += 12;
  if (suffix === 'am' && hour === 12) hour = 0;

  if (hour < 8 || hour > 15) return 'Other';
  return `${hour}:00-${hour + 1}:00`;
}
