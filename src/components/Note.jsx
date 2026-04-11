import { AlertTriangle } from 'lucide-react';
import { T } from '../theme';

export function Note({ children, tone = 'amber' }) {
  const c = tone === 'red' ? T.alert : tone === 'blue' ? T.accent : T.amber;
  return (
    <div className="flex gap-2.5 rounded p-2.5 mb-3" style={{ background: c + '0f', borderLeft: `2px solid ${c}55` }}>
      <AlertTriangle className="flex-shrink-0 mt-0.5" style={{ color: c, width: 12, height: 12 }} />
      <p className="text-[11px] leading-[1.55]" style={{ color: T.textDim }}>{children}</p>
    </div>
  );
}
