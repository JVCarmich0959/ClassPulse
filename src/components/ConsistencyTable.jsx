import { MONO, T } from '../theme';

export function ConsistencyTable({ consistency }) {
  const pctC = (p) => (p >= 80 ? T.green : p >= 50 ? T.amber : T.alert);
  const lagC = (h) => (h <= 2.5 ? T.green : h <= 4 ? T.amber : T.alert);
  const chartC = (v) => (v >= 60 ? T.green : v < 25 ? T.alert : T.amber);
  const patC = (p) => (p === 'Consistent' ? T.green : p === 'Intermittent' ? T.alert : T.amber);
  return (
    <div className="rounded overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
      <table className="w-full text-left text-[11px]" style={MONO}>
        <thead><tr style={{ background: T.surfaceHi }}>{['Specials', 'Active wks / 11', 'Per week', 'Per day', 'Median lag', 'Chart use', 'Pattern'].map((h) => <th key={h} className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color: T.textDim }}>{h}</th>)}</tr></thead>
        <tbody>
          {consistency.map((r, i) => (
            <tr key={r.name} style={{ background: i % 2 ? T.surface : T.surfaceHi + '88' }}>
              <td className="px-3 py-2 font-medium" style={{ color: T.textBright }}>{r.name}</td>
              <td className="px-3 py-2" style={{ color: T.text }}>{r.active}<span className="ml-1.5 text-[10px] px-1 py-0.5 rounded" style={{ background: pctC(r.pct) + '15', color: pctC(r.pct) }}>{r.pct}%</span></td>
              <td className="px-3 py-2" style={{ color: T.text }}>{r.perWk}</td><td className="px-3 py-2" style={{ color: T.text }}>{r.perDay}</td>
              <td className="px-3 py-2"><span className="px-1 py-0.5 rounded text-[10px] font-semibold" style={{ background: lagC(r.lag) + '15', color: lagC(r.lag) }}>{r.lag}h</span></td>
              <td className="px-3 py-2"><span className="px-1 py-0.5 rounded text-[10px] font-semibold" style={{ background: chartC(r.chart) + '15', color: chartC(r.chart) }}>{r.chart}%</span></td>
              <td className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wide" style={{ color: patC(r.pattern) }}>{r.pattern}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-1.5" style={{ borderTop: `1px solid ${T.border}`, background: T.surfaceHi }}><span className="text-[10px]" style={{ color: T.textDim }}>Median lag = estimated hours between incident and form submission. Higher lag correlates with lower incident-time accuracy.</span></div>
    </div>
  );
}
