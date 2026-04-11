import React, { useMemo } from 'react';
import { MONO, T } from '../theme';

export function HeatmapGrid({ heatmap }) {
  const cols = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const max = useMemo(() => Math.max(...heatmap.flatMap((r) => cols.map((c) => r[c]))), [heatmap]);
  return (
    <div className="rounded overflow-hidden text-[10px]" style={{ border: `1px solid ${T.border}` }}>
      <div className="grid" style={{ gridTemplateColumns: '76px repeat(5,1fr)' }}>
        <div className="px-2 py-1.5" style={{ background: T.surfaceHi, color: T.textDim }}>Block</div>
        {cols.map((c) => <div key={c} className="py-1.5 text-center font-semibold uppercase tracking-wide" style={{ background: T.surfaceHi, color: T.textDim }}>{c}</div>)}
        {heatmap.map((row, ri) => (
          <React.Fragment key={row.block}>
            <div key={`${row.block}-b`} className="px-2 py-2" style={{ ...MONO, color: T.textDim, background: ri % 2 ? T.surface : T.surfaceHi }}>{row.block}</div>
            {cols.map((c) => {
              const v = row[c];
              const a = max === 0 ? 0 : v / max;
              return <div key={`${row.block}-${c}`} className="flex items-center justify-center py-2 font-semibold" style={{ ...MONO, background: `rgba(74,143,255,${0.04 + a * 0.44})`, color: a > 0.5 ? T.textBright : T.textDim }}>{v || <span style={{ color: T.muted }}>—</span>}</div>;
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
