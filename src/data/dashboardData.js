export const kpis = [
  { label: "Total incidents", value: "248", sub: "Jan 21 – Apr 1, 2026" },
  { label: "Per school day", value: "5.5", sub: "45 logged days, calendar-adj." },
  { label: "Color chart used", value: "41%", sub: "102 of 248 incidents" },
  { label: "Home contacted", value: "14%", sub: "35 of 248 incidents", flag: true },
  { label: "Incident time known", value: "57%", sub: "142 confirmed · 106 excluded" },
];

export const dq = [
  { label: "Behavior type missing", pct: 28, n: 70, color: "amber" },
  { label: "Specials class missing", pct: 9, n: 22, color: "amber" },
  { label: "Incident time unknown", pct: 43, n: 106, color: "alert" },
  { label: "Student name missing", pct: 0.4, n: 1, color: "green" },
];

export const weekly = [
  { week: "Jan W4", rate: 7.67, ma: 8.21, days: 3, note: "Post-Q2 reentry · MLK Day Mon" },
  { week: "Jan W5", rate: 8.75, ma: 5.87, days: 4, note: "WD Fri Jan 30" },
  { week: "Feb W6", rate: 1.2, ma: 5.18, days: 5, note: "Low confidence — 1 of 5 days logged" },
  { week: "Feb W7", rate: 5.6, ma: 3.52, days: 5, note: "" },
  { week: "Feb W8", rate: 3.75, ma: 4.78, days: 4, note: "WD Mon Feb 16" },
  { week: "Feb W9", rate: 5.0, ma: 5.32, days: 4, note: "WD Fri Feb 27" },
  { week: "Mar W10", rate: 7.2, ma: 4.87, days: 5, note: "" },
  { week: "Mar W11", rate: 2.4, ma: 4.87, days: 5, note: "" },
  { week: "Mar W12", rate: 5.0, ma: 3.93, days: 4, note: "WD Fri Mar 20" },
  { week: "Mar W13", rate: 4.4, ma: 6.58, days: 5, note: "End of Q3" },
  { week: "W14", rate: 10.33, ma: 7.37, days: 3, note: "Mon–Wed only · spring break Apr 3" },
];

export const calFlags = { lowConf: ["Feb W6"], preBreak: ["W14"] };

export const grades = [
  { grade: "Kinder", n: 49 }, { grade: "1st", n: 29 }, { grade: "2nd", n: 48 },
  { grade: "3rd", n: 29 }, { grade: "4th", n: 37 }, { grade: "5th", n: 49 },
];

export const specialsNorm = [
  { name: "P.E.", perDay: 3.73, days: 26 },
  { name: "Technology", perDay: 3.59, days: 22 },
  { name: "Music", perDay: 2.71, days: 7 },
  { name: "Art", perDay: 1.63, days: 19 },
];

export const dow = [
  { day: "Mon", rate: 8.67 }, { day: "Tue", rate: 5.56 }, { day: "Wed", rate: 5.91 },
  { day: "Thu", rate: 5.33 }, { day: "Fri", rate: 4.71 },
];

export const behaviors = [
  { type: "Verbal disruption", n: 76 }, { type: "Noncompliance", n: 65 },
  { type: "Off-task", n: 61 }, { type: "Emotional distress", n: 59 },
  { type: "Peer conflict", n: 51 }, { type: "Physical behavior", n: 36 },
  { type: "Out of seat", n: 29 }, { type: "Device misuse", n: 12 },
  { type: "Unspecified", n: 70 },
];

export const timeBlocks = [
  { block: "Before 9am (confirmed)", n: 30, uncertain: false },
  { block: "Before 9am (uncertain)", n: 18, uncertain: true },
  { block: "9–10am", n: 18 }, { block: "10–11am", n: 27 },
  { block: "11–12pm", n: 8 }, { block: "12–1pm", n: 7 },
  { block: "1–2pm", n: 23 }, { block: "2–3pm", n: 27 },
  { block: "3pm+", n: 2 },
];

export const heatmap = [
  { block: "9–10am", Mon: 4, Tue: 3, Wed: 6, Thu: 3, Fri: 2 },
  { block: "10–11am", Mon: 7, Tue: 5, Wed: 8, Thu: 5, Fri: 2 },
  { block: "11–12pm", Mon: 2, Tue: 2, Wed: 3, Thu: 1, Fri: 0 },
  { block: "12–1pm", Mon: 0, Tue: 2, Wed: 2, Thu: 2, Fri: 1 },
  { block: "1–2pm", Mon: 3, Tue: 8, Wed: 7, Thu: 4, Fri: 1 },
  { block: "2–3pm", Mon: 7, Tue: 6, Wed: 6, Thu: 6, Fri: 2 },
];

export const topClasses = [
  { cls: "2nd – Clark", n: 22 }, { cls: "4th – Edwards", n: 22 },
  { cls: "5th – Smith", n: 22 }, { cls: "K – Wing", n: 19 },
  { cls: "5th – Davis", n: 18 }, { cls: "K – Fortner", n: 17 },
  { cls: "3rd – Mello", n: 12 }, { cls: "2nd – Kennedy", n: 11 },
];

export const monthly = [
  { month: "Jan", PE: 15, Technology: 12, Art: 3, Music: 5 },
  { month: "Feb", PE: 10, Technology: 38, Art: 9, Music: 13 },
  { month: "Mar", PE: 66, Technology: 28, Art: 16, Music: 0 },
  { month: "Apr", PE: 6, Technology: 1, Art: 3, Music: 1 },
];

export const consistency = [
  { name: "Technology", active: 11, pct: 100, perWk: 7.2, perDay: 3.59, lag: 1.9, chart: 44, pattern: "Consistent" },
  { name: "P.E.", active: 10, pct: 91, perWk: 9.7, perDay: 3.73, lag: 2.4, chart: 46, pattern: "Mar surge" },
  { name: "Art", active: 10, pct: 91, perWk: 3.1, perDay: 1.63, lag: 3.1, chart: 32, pattern: "Low volume" },
  { name: "Music", active: 4, pct: 36, perWk: 4.8, perDay: 2.71, lag: 6.8, chart: 11, pattern: "Intermittent" },
];

export const students = [
  { name: "London German", n: 9 }, { name: "Austin Crowder", n: 8 },
  { name: "Gabriel Smith", n: 7 }, { name: "Eternity Deitz-Hutchison", n: 5 },
  { name: "Jaxon / Jaxson Anderson", n: 5 }, { name: "Kaiden Horlback", n: 4 },
  { name: "Ibrie Stanley", n: 4 }, { name: "Chester King", n: 4 },
  { name: "Kamarri Douglas", n: 4 }, { name: "Lafayette Joyner", n: 4 },
  { name: "Foster Langdon", n: 4 }, { name: "Osiel Lopez", n: 4 },
];

export const roadmap = [
  {
    title: "EOG testing window (May 19–21)",
    body: "Grades 3–5 EOG testing falls outside the current data window. If logging continues, marking that window in the trend would separate test-prep stress from baseline behavior.",
  },
  {
    title: "Incidents per 100 class meetings",
    body: "Per-day rates assume equal exposure. Once a specials schedule is available, normalizing by class meetings rather than calendar days would make cross-teacher comparisons more accurate.",
  },
  {
    title: "Coded consequence field",
    body: "The consequences column is free text. 'Sidelined,' 'sideline,' and 'asked to sideline' are the same action. A controlled vocabulary upstream would make consequence tracking usable.",
  },
  {
    title: "Student ID instead of name",
    body: "'Jaxon' and 'Jaxson Anderson' were caught manually. A stable student ID would make repeat-student counts reliable rather than dependent on name-matching.",
  },
];

export const TABS = [
  { id: "overview", label: "System overview" },
  { id: "timing", label: "Timing & transitions" },
  { id: "coverage", label: "Fidelity & coverage" },
  { id: "outcomes", label: "Fidelity vs outcomes" },
  { id: "followup", label: "Student planning" },
];

export const SPEC_COLORS = {
  PE: "accent",
  Technology: "green",
  Art: "amber",
  Music: "alert",
  Unknown: "muted",
};
