import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Panel } from '../components/Panel';
import { fade, MONO, T, tip } from '../theme';

export function FollowupView({ data }) {
  const firstAidLogs = data.firstAidLogs || [];

  return <motion.div {...fade} className="space-y-3"><div className="flex items-start gap-2.5 rounded p-3" style={{ background: T.alert + '0e', border: `1px solid ${T.alert}28` }}><Lock style={{ color: T.alert, width: 13, height: 13, marginTop: 2, flexShrink: 0 }} /><p className="text-[11px] leading-[1.6]" style={{ color: T.textDim }}><b style={{ color: T.alert }}>Restricted.</b> Scholar names are for support coordination and administrator use only. Do not distribute without redacting names. Incident counts reflect specials logs only — cross-reference with homeroom records and referral data before taking action. Frequency does not indicate severity or risk classification.</p></div>
    <div className="grid gap-3 xl:grid-cols-[1.1fr_1fr]"><Panel title="Scholars with 4 or more logged incidents" sub="Specials records only · Jan 21 – Apr 1, 2026"><div className="space-y-2.5 mt-1">{data.students.map((s, i) => <div key={s.name}><div className="flex items-center justify-between mb-1"><span className="text-[11px]" style={{ color: T.text }}>{s.name}</span><span className="text-[11px] font-semibold" style={{ color: s.n >= 7 ? T.alert : s.n >= 5 ? T.amber : T.textDim, ...MONO }}>{s.n}</span></div><div className="h-1 rounded-full overflow-hidden" style={{ background: T.border }}><motion.div className="h-full rounded-full" style={{ background: s.n >= 7 ? T.alert : s.n >= 5 ? T.amber : T.accent }} initial={{ width: 0 }} animate={{ width: `${(s.n / 9) * 100}%` }} transition={{ delay: i * 0.03, duration: 0.35 }} /></div></div>)}</div><p className="mt-3 text-[10px] leading-5" style={{ color: T.textDim }}>'Jaxon' and 'Jaxson Anderson' are merged above. Other name variants may not have been caught. Use a stable scholar ID for reliable deduplication.</p></Panel>
      <div className="space-y-3"><Panel title="Timing coverage" sub="Whether incident time was confirmed or inferred from submission timestamp"><div className="h-44"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{ name: 'Confirmed (142)', value: 142, fill: T.green }, { name: 'Submission time only (106)', value: 106, fill: T.muted }]} dataKey="value" innerRadius={52} outerRadius={76} paddingAngle={3} /><Tooltip {...tip} /><Legend wrapperStyle={{ fontSize: 10, color: T.textDim }} /></PieChart></ResponsiveContainer></div></Panel><Panel title="Field completeness" sub="Across all 248 records"><div className="h-40"><ResponsiveContainer width="100%" height="100%"><BarChart layout="vertical" data={[{ field: 'Scholar name', pct: 100 }, { field: 'Specials class', pct: 91 }, { field: 'Behavior type', pct: 72 }, { field: 'Incident time', pct: 57 }]} margin={{ left: 6, right: 24 }}><CartesianGrid stroke={T.grid} horizontal={false} /><XAxis type="number" domain={[0, 100]} tickFormatter={(v) => v + '%'} /><YAxis type="category" dataKey="field" width={84} /><Tooltip {...tip} formatter={(v) => [v + '%']} /><Bar dataKey="pct" radius={[0, 3, 3, 0]}>{[100, 91, 72, 57].map((v, i) => <Cell key={i} fill={v >= 90 ? T.green : v >= 70 ? T.amber : T.alert} />)}</Bar></BarChart></ResponsiveContainer></div></Panel></div></div>

    <Panel title="First Aid" sub="Separate first_aid_log records · never included in behavior incident totals, charts, MTSS flags, or pattern thresholds">
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr style={{ color: T.textDim }}>
              <th className="text-left py-1 pr-2">Scholar</th><th className="text-left py-1 pr-2">Homeroom</th><th className="text-left py-1 pr-2">Date</th><th className="text-left py-1 pr-2">Injury Description</th><th className="text-left py-1 pr-2">Treatment</th><th className="text-left py-1">Home Contacted</th>
            </tr>
          </thead>
          <tbody>
            {firstAidLogs.map((row) => (
              <tr key={row.id} style={{ borderTop: `1px solid ${T.border}` }}>
                <td className="py-1.5 pr-2" style={{ color: T.text }}>{row.scholar}</td>
                <td className="py-1.5 pr-2" style={{ color: T.textDim }}>{row.homeroom}</td>
                <td className="py-1.5 pr-2" style={{ color: T.textDim }}>{row.incidentDate}</td>
                <td className="py-1.5 pr-2" style={{ color: T.text }}>{row.injuryDescription}</td>
                <td className="py-1.5 pr-2" style={{ color: T.text }}>{row.treatment}</td>
                <td className="py-1.5" style={{ color: row.homeContact ? T.alert : T.textDim }}>{row.homeContact ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>

    <Panel title="Scholar Profile — First Aid / Injury Log" sub="Displayed separately from behavior incident history for each scholar">
      <div className="space-y-3">
        {firstAidLogs.map((row) => (
          <div key={`profile-${row.id}`} className="rounded p-2" style={{ background: T.surfaceHi, border: `1px solid ${T.border}` }}>
            <div className="text-[11px] font-semibold" style={{ color: T.textBright }}>{row.scholar}</div>
            <div className="text-[10px] mt-1" style={{ color: T.textDim }}>{row.incidentDate} · {row.specials}</div>
            <div className="text-[10px] mt-1" style={{ color: T.text }}>Injury: {row.injuryDescription}</div>
            <div className="text-[10px]" style={{ color: T.text }}>Treatment: {row.treatment}</div>
            <div className="text-[10px]" style={{ color: T.textDim }}>Returned to activity: {row.returnedToActivity ? 'Yes' : 'No'} · Home contacted: {row.homeContact ? 'Yes' : 'No'}</div>
          </div>
        ))}
      </div>
    </Panel>

    <Panel title="Data and form improvements"><div className="space-y-px">{data.roadmap.map((r, i) => <div key={i} className="py-2.5 px-1" style={{ borderBottom: i < data.roadmap.length - 1 ? `1px solid ${T.border}` : 'none' }}><div className="text-[11px] font-semibold mb-0.5" style={{ color: T.text }}>{r.title}</div><div className="text-[10px] leading-[1.55]" style={{ color: T.textDim }}>{r.body}</div></div>)}</div></Panel></motion.div>;
}
