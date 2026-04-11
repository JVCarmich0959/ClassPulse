import { motion } from 'framer-motion';
import { MONO, T } from '../theme';

function Mn({ children, style = {}, className = '' }) {
  return <span className={className} style={{ ...MONO, ...style }}>{children}</span>;
}

export function KpiGrid({ kpis }) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4 md:grid-cols-5">
      {kpis.map((k, i) => (
        <motion.div key={k.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04, duration: 0.2 }}>
          <div className="rounded p-3 h-full" style={{ background: T.surface, border: `1px solid ${k.flag ? T.alert + '55' : T.border}` }}>
            <div className="text-[10px] uppercase tracking-wide mb-1.5" style={{ color: T.textDim }}>{k.label}</div>
            <Mn className="text-[22px] font-bold block" style={{ color: k.flag ? T.alert : k.value === '41%' ? T.amber : T.textBright }}>{k.value}</Mn>
            <div className="text-[10px] mt-0.5" style={{ color: T.textDim }}>{k.sub}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
