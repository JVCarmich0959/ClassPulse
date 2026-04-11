export const T = {
  bg: '#09101a',
  surface: '#0e1621',
  surfaceHi: '#131e2c',
  border: 'rgba(100,130,180,0.13)',
  borderHi: 'rgba(100,130,180,0.24)',
  accent: '#4a8fff',
  alert: '#e8604a',
  amber: '#d4952e',
  green: '#38b87a',
  muted: '#3d4f65',
  text: '#b8cde0',
  textDim: '#5f7590',
  textBright: '#e8f0f8',
  grid: 'rgba(100,130,180,0.07)',
  series: ['#4a8fff', '#38b87a', '#d4952e', '#e8604a', '#9b87f5', '#36b8d4', '#e07340', '#3d4f65'],
};

export const MONO = { fontFamily: "'DM Mono', 'Fira Mono', monospace" };

export const tip = {
  contentStyle: {
    background: T.surface,
    border: `1px solid ${T.borderHi}`,
    borderRadius: 6,
    fontSize: 11,
    color: T.text,
  },
  labelStyle: { color: T.textBright, fontWeight: 600, ...MONO },
  itemStyle: { color: T.textDim },
};

export const ax = {
  stroke: 'transparent',
  tick: { fill: T.textDim, fontSize: 10, ...MONO },
};

export const fade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.2 },
};

export const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'timing', label: 'Incident timing' },
  { id: 'coverage', label: 'Specials log coverage' },
  { id: 'followup', label: 'Student follow-up' },
];

export const SPEC_COLORS = { PE: T.accent, Technology: T.green, Art: T.amber, Music: T.alert, Unknown: T.muted };
