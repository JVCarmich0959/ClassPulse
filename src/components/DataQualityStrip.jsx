import { MONO, T } from '../theme';

function Mn({ children, style = {}, className = '' }) {
  return <span className={className} style={{ ...MONO, ...style }}>{children}</span>;
}

export function DataQualityStrip({ dq }) {
  return (
    <div className="rounded p-3 mb-4" style={{ background: T.surfaceHi, border: `1px solid ${T.border}`, borderLeft: `2px solid ${T.amber}` }}>
      <div className="text-[10px] font-semibold uppercase tracking-wide mb-2.5" style={{ color: T.amber }}>Data limitations affecting interpretation</div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {dq.map((q) => (
          <div key={q.label}>
            <div className="flex justify-between mb-1">
              <span className="text-[10px]" style={{ color: T.textDim }}>{q.label}</span>
              <Mn className="text-[10px] font-semibold" style={{ color: q.color }}>{q.n}</Mn>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: T.muted + '40' }}>
              <div className="h-full rounded-full" style={{ width: `${Math.max(q.pct, 0.5)}%`, background: q.color }} />
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: T.textDim + '99' }}>{q.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
