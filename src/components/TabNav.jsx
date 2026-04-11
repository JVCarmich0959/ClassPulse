import { motion } from 'framer-motion';
import { T, TABS } from '../theme';

export function TabNav({ active, onChange }) {
  return (
    <div className="flex gap-0.5 rounded-md p-0.5" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
      {TABS.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} className="relative flex-1 rounded px-3 py-1.5 text-[11px] font-medium transition-colors" style={{ color: active === t.id ? T.textBright : T.textDim }}>
          {active === t.id && (
            <motion.div
              layoutId="tab-bg"
              className="absolute inset-0 rounded"
              style={{ background: T.surfaceHi, border: `1px solid ${T.borderHi}` }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            />
          )}
          <span className="relative z-10">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
