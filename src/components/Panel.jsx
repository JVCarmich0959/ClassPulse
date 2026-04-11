import { T } from '../theme';

export function Panel({ title, sub, children, right }) {
  return (
    <div className="rounded-lg p-4" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[12px] font-semibold" style={{ color: T.textBright }}>{title}</div>
          {sub && <div className="text-[10px] mt-0.5" style={{ color: T.textDim }}>{sub}</div>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}
