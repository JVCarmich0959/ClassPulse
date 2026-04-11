import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Lock } from "lucide-react";
import {
  ResponsiveContainer, ComposedChart, Area, CartesianGrid,
  XAxis, YAxis, Tooltip, BarChart, Bar, Cell,
  PieChart, Pie, LineChart, Line, Legend, ReferenceLine,
} from "recharts";
import { T, MONO, tip, ax } from "./theme";
import {
  kpis as fallbackKpis,
  dq as fallbackDq,
  weekly as fallbackWeekly,
  calFlags as fallbackCalFlags,
  grades as fallbackGrades,
  specialsNorm as fallbackSpecialsNorm,
  dow as fallbackDow,
  behaviors as fallbackBehaviors,
  timeBlocks as fallbackTimeBlocks,
  heatmap as fallbackHeatmap,
  topClasses as fallbackTopClasses,
  monthly as fallbackMonthly,
  consistency as fallbackConsistency,
  students as fallbackStudents,
  roadmap as fallbackRoadmap,
  TABS,
  SPEC_COLORS,
} from "./data/dashboardData";
import { useDashboardData } from "./hooks/useDashboardData";

function Mn({ children, style = {}, className = "" }) {
  return <span className={className} style={{ ...MONO, ...style }}>{children}</span>;
}

function Note({ children, tone = "amber" }) {
  const c = tone === "red" ? T.alert : tone === "blue" ? T.accent : T.amber;
  return (
    <div className="flex gap-2.5 rounded p-2.5 mb-3"
      style={{ background: c + "0f", borderLeft: `2px solid ${c}55` }}>
      <AlertTriangle className="flex-shrink-0 mt-0.5" style={{ color: c, width:12, height:12 }} />
      <p className="text-[11px] leading-[1.55]" style={{ color: T.textDim }}>{children}</p>
    </div>
  );
}

function Box({ title, sub, children, right }) {
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

// ─── Heatmap ──────────────────────────────────────────────────────────────────
function HeatmapGrid({ rows }) {
  const cols = ["Mon","Tue","Wed","Thu","Fri"];
  const max = useMemo(() => Math.max(...rows.flatMap(r => cols.map(c => r[c] || 0))), [rows]);
  return (
    <div className="rounded overflow-hidden text-[10px]" style={{ border:`1px solid ${T.border}` }}>
      <div className="grid" style={{ gridTemplateColumns:"76px repeat(5,1fr)" }}>
        <div className="px-2 py-1.5" style={{ background:T.surfaceHi, color:T.textDim }}>Block</div>
        {cols.map(c => (
          <div key={c} className="py-1.5 text-center font-semibold uppercase tracking-wide"
            style={{ background:T.surfaceHi, color:T.textDim }}>{c}</div>
        ))}
        {rows.map((row,ri) => (
          <React.Fragment key={row.block}>
            <div className="px-2 py-2" style={{ ...MONO, color:T.textDim, background: ri%2 ? T.surface : T.surfaceHi }}>
              {row.block}
            </div>
            {cols.map(c => {
              const v = row[c]; const a = max === 0 ? 0 : v / max;
              return (
                <div key={c} className="flex items-center justify-center py-2 font-semibold"
                  style={{ ...MONO, background:`rgba(74,143,255,${0.04+a*0.44})`, color: a>0.5 ? T.textBright : T.textDim }}>
                  {v || <span style={{color:T.muted}}>—</span>}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Consistency table ────────────────────────────────────────────────────────
function ConsistencyTable({ rows }) {
  const pctC  = p => p>=80 ? T.green : p>=50 ? T.amber : T.alert;
  const lagC  = h => h<=2.5 ? T.green : h<=4 ? T.amber : T.alert;
  const chartC = v => v>=60 ? T.green : v<25 ? T.alert : T.amber;
  const patC  = p => p==="Consistent" ? T.green : p==="Intermittent" ? T.alert : T.amber;
  return (
    <div className="rounded overflow-hidden" style={{ border:`1px solid ${T.border}` }}>
      <table className="w-full text-left text-[11px]">
        <thead>
          <tr style={{ background:T.surfaceHi }}>
            {["Specials","Active wks / 11","Per week","Per day","Median lag","Chart use","Pattern"].map(h => (
              <th key={h} className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wide"
                style={{ color:T.textDim }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i) => (
            <tr key={r.name} style={{ background: i%2 ? T.surface : T.surfaceHi+"88" }}>
              <td className="px-3 py-2 font-medium" style={{ color:T.textBright }}>{r.name}</td>
              <td className="px-3 py-2">
                <Mn style={{ color:T.text }}>{r.active}</Mn>
                <span className="ml-1.5 text-[10px] px-1 py-0.5 rounded"
                  style={{ background:pctC(r.pct)+"15", color:pctC(r.pct) }}>{r.pct}%</span>
              </td>
              <td className="px-3 py-2"><Mn style={{ color:T.text }}>{r.perWk}</Mn></td>
              <td className="px-3 py-2"><Mn style={{ color:T.text }}>{r.perDay}</Mn></td>
              <td className="px-3 py-2">
                <span className="px-1 py-0.5 rounded text-[10px] font-semibold"
                  style={{ background:lagC(r.lag)+"15", color:lagC(r.lag) }}>{r.lag}h</span>
              </td>
              <td className="px-3 py-2">
                <span className="px-1 py-0.5 rounded text-[10px] font-semibold"
                  style={{ background:chartC(r.chart)+"15", color:chartC(r.chart) }}>{r.chart}%</span>
              </td>
              <td className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wide"
                style={{ color:patC(r.pattern) }}>{r.pattern}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-1.5" style={{ borderTop:`1px solid ${T.border}`, background:T.surfaceHi }}>
        <span className="text-[10px]" style={{ color:T.textDim }}>
          Median lag = estimated hours between incident and form submission.
          Higher lag correlates with lower incident-time accuracy.
        </span>
      </div>
    </div>
  );
}

// ─── Tab nav ──────────────────────────────────────────────────────────────────
function TabNav({ active, onChange }) {
  return (
    <div className="flex gap-0.5 rounded-md p-0.5" style={{ background:T.surface, border:`1px solid ${T.border}` }}>
      {TABS.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className="relative flex-1 rounded px-3 py-1.5 text-[11px] font-medium transition-colors"
          style={{ color: active===t.id ? T.textBright : T.textDim }}>
          {active===t.id && (
            <motion.div layoutId="tab-bg" className="absolute inset-0 rounded"
              style={{ background:T.surfaceHi, border:`1px solid ${T.borderHi}` }}
              transition={{ type:"spring", stiffness:500, damping:40 }} />
          )}
          <span className="relative z-10">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Views ────────────────────────────────────────────────────────────────────
const fade = {
  initial: { opacity:0, y:6  },
  animate: { opacity:1, y:0  },
  exit:    { opacity:0, y:-4 },
  transition: { duration:0.2 },
};

function Overview({ weekly = [], calFlags = fallbackCalFlags, grades = [], specialsNorm = [], topClasses = [], behaviors = [] }) {
  const maxRate = Math.max(...weekly.map(d => d.rate));
  return (
    <motion.div {...fade} className="space-y-3">
      <div className="grid gap-3 xl:grid-cols-[1.6fr_1fr]">
        <Box title="Weekly incident rate"
          sub="Incidents per school day (WSA calendar-adjusted) · dashed = 3-week moving avg">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={weekly} margin={{ top:4, right:4, bottom:0, left:-12 }}>
                <defs>
                  <linearGradient id="ag" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%"   stopColor={T.accent} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={T.accent} stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={T.grid} vertical={false} />
                <XAxis dataKey="week" {...ax} tick={{ ...ax.tick, fontSize:9 }} />
                <YAxis {...ax} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0]?.payload;
                    return (
                      <div style={{ background:T.surface, border:`1px solid ${T.borderHi}`, borderRadius:6, padding:"8px 10px", fontSize:11 }}>
                        <div style={{ color:T.textBright, ...MONO, marginBottom:3 }}>{label}</div>
                        <div style={{ color:T.accent }}>Rate: <b>{d?.rate?.toFixed(2)}/day</b></div>
                        <div style={{ color:T.amber }}>3-wk avg: {d?.ma?.toFixed(2)}</div>
                        <div style={{ color:T.textDim }}>Cal. days: {d?.days}</div>
                        {d?.note && <div style={{ color:T.amber, marginTop:3, paddingTop:3, borderTop:`1px solid ${T.border}` }}>{d.note}</div>}
                      </div>
                    );
                  }}
                />
                <ReferenceLine y={5.5} stroke={T.muted} strokeDasharray="3 3"
                  label={{ value:"dataset avg", fill:T.textDim, fontSize:9, position:"insideTopRight" }} />
                <Area type="monotone" dataKey="rate" stroke={T.accent} strokeWidth={2} fill="url(#ag)"
                  dot={(props) => {
                    const { cx, cy, payload:p } = props;
                    if (calFlags.lowConf.includes(p.week))
                      return <circle key="lc" cx={cx} cy={cy} r={3} fill={T.surfaceHi} stroke={T.muted} strokeWidth={1.5} />;
                    if (p.rate === maxRate)
                      return <circle key="sp" cx={cx} cy={cy} r={5} fill={T.alert} stroke={T.bg} strokeWidth={2} />;
                    if (calFlags.preBreak.includes(p.week))
                      return <circle key="pb" cx={cx} cy={cy} r={4} fill="none" stroke={T.alert} strokeWidth={1.5} />;
                    return <circle key={cx} cx={cx} cy={cy} r={2.5} fill={T.accent} />;
                  }}
                />
                <Line type="monotone" dataKey="ma" stroke={T.amber} strokeWidth={1.5} strokeDasharray="5 4" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px]" style={{ color:T.textDim }}>
            <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5" style={{background:T.accent}}/> Rate/day</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-4 border-t border-dashed" style={{borderColor:T.amber}}/> 3-wk avg</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full" style={{background:T.alert}}/> Highest week</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full border" style={{borderColor:T.alert,background:"transparent"}}/> Pre-spring break</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full border" style={{borderColor:T.muted,background:T.surfaceHi}}/> Low confidence</span>
          </div>
          <div className="mt-3 space-y-0">
            <Note>Feb W6 shows 1.2/day but the WSA calendar confirms a full 5-day school week with no holidays or workdays. Only 1 of 5 days had any incident logged. Do not read W6 as a behavioral improvement.</Note>
            <Note>W14 (Mar 30–Apr 1) is the highest week at 10.33/day. This is a 3-day partial week — spring break started Apr 3. Pre-break weeks are a common behavioral spike period.</Note>
          </div>
        </Box>

        <Box title="Incidents by grade" sub="Raw count">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={grades} margin={{ top:4, right:4, bottom:0, left:-14 }}>
                <CartesianGrid stroke={T.grid} vertical={false} />
                <XAxis dataKey="grade" {...ax} />
                <YAxis {...ax} />
                <Tooltip {...tip} />
                <Bar dataKey="n" radius={[3,3,0,0]}>
                  {grades.map((d,i) => <Cell key={d.grade} fill={T.series[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Box>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.1fr_1fr]">
        <Box title="Incidents per logging day by specials"
          sub="Normalized by days with at least one logged incident">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialsNorm} layout="vertical" margin={{ left:6, right:4 }}>
                <CartesianGrid stroke={T.grid} horizontal={false} />
                <XAxis type="number" {...ax} domain={[0,5]} />
                <YAxis type="category" dataKey="name" {...ax} width={80} />
                <Tooltip {...tip} formatter={v=>[`${v.toFixed(2)} / day`]} />
                <Bar dataKey="perDay" radius={[0,3,3,0]}>
                  {specialsNorm.map((d,i) => <Cell key={d.name} fill={T.series[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Box>

        <Box title="Top classes by incident count" sub="Normalized class names · three-way tie at 22">
          <div className="space-y-2 mt-1">
            {topClasses.map((row,i) => (
              <div key={row.cls}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Mn className="text-[10px] w-4 text-right" style={{ color:T.textDim }}>{i+1}</Mn>
                    <span className="text-[11px]" style={{ color:T.text }}>{row.cls}</span>
                  </div>
                  <Mn className="text-[11px] font-semibold" style={{ color:T.textBright }}>{row.n}</Mn>
                </div>
                <div className="h-1 rounded-full overflow-hidden ml-6" style={{ background:T.border }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: i<3 ? T.alert : T.accent }}
                    initial={{ width:0 }}
                    animate={{ width:`${(row.n/22)*100}%` }}
                    transition={{ delay:i*0.03+0.15, duration:0.4 }} />
                </div>
              </div>
            ))}
          </div>
        </Box>
      </div>

      <Box title="Observed behavior types"
        sub="All 248 records · 'Unspecified' = no behavior type tagged (70 records, 28%)"
        right={
          <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
            style={{ background:T.alert+"18", color:T.alert }}>28% untagged</span>
        }>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={behaviors} layout="vertical" margin={{ left:14, right:8 }}>
              <CartesianGrid stroke={T.grid} horizontal={false} />
              <XAxis type="number" {...ax} />
              <YAxis type="category" dataKey="type" {...ax} width={128} />
              <Tooltip {...tip} />
              <Bar dataKey="n" radius={[0,3,3,0]}>
                {behaviors.map((d,i) => (
                  <Cell key={d.type} fill={d.type==="Unspecified" ? T.muted : T.series[i%T.series.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Box>
    </motion.div>
  );
}

function Timing({ dow = [], timeBlocks = [], heatmap = [] }) {
  const maxDow = Math.max(...dow.map(d => d.rate));
  return (
    <motion.div {...fade} className="space-y-3">
      <div className="grid gap-3 xl:grid-cols-2">
        <Box title="Incidents per school day by weekday"
          sub="Normalized by school days logged in that weekday slot">
          <Note>Raw counts show Wednesday highest (65). After normalization: Monday leads at 8.67/day. Wednesday had more Wednesdays in the data window, not proportionally more incidents.</Note>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dow} margin={{ top:4, right:4, bottom:0, left:-14 }}>
                <CartesianGrid stroke={T.grid} vertical={false} />
                <XAxis dataKey="day" {...ax} />
                <YAxis {...ax} domain={[0,10]} />
                <Tooltip {...tip} formatter={v=>[`${v.toFixed(2)} / day`]} />
                <Bar dataKey="rate" radius={[3,3,0,0]}>
                  {dow.map(d => <Cell key={d.day} fill={d.rate===maxDow ? T.alert : T.accent} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Box>

        <Box title="Incident time distribution"
          sub="Confirmed incident times only (142 records) · uncertain before-9am block muted">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeBlocks} margin={{ top:4, right:4, bottom:28, left:-14 }}>
                <CartesianGrid stroke={T.grid} vertical={false} />
                <XAxis dataKey="block" {...ax} angle={-25} textAnchor="end" interval={0}
                  tick={{ ...ax.tick, fontSize:9 }} />
                <YAxis {...ax} />
                <Tooltip {...tip} />
                <Bar dataKey="n" radius={[3,3,0,0]}>
                  {timeBlocks.map(d => (
                    <Cell key={d.block} fill={d.uncertain ? T.muted : T.green} opacity={d.uncertain ? 0.38 : 1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Box>
      </div>

      <Box title="Incident time by day and hour block"
        sub="Confirmed incident times only · 9am–3pm window · before-9am excluded">
        <HeatmapGrid rows={heatmap} />
        <p className="mt-2 text-[10px] leading-5" style={{ color:T.textDim }}>
          106 of 248 records have submission time only and are excluded.
          Before-9am incidents appear in the chart above but are omitted from the grid due to timing ambiguity.
        </p>
      </Box>
    </motion.div>
  );
}

function Coverage({ consistency = [], monthly = [] }) {
  return (
    <motion.div {...fade} className="space-y-3">
      <Box title="Specials logging coverage"
        sub="Active weeks = weeks with at least one incident logged · 11 weeks total in window">
        <Note>Music logged in only 4 of 11 weeks (36%). Music also has the highest median submission lag (6.8h) and the lowest confirmed incident-time rate (21%). This is consistent with delayed or infrequent form use. Cannot determine from data alone whether this reflects fewer incidents or incomplete logging.</Note>
        <Note>P.E. recorded 66 of its 97 incidents in March. Confirm with the teacher whether this reflects a change in documentation practice before drawing conclusions from the trend.</Note>
        <ConsistencyTable rows={consistency} />
      </Box>

      <div className="grid gap-3 xl:grid-cols-[1.3fr_1fr]">
        <Box title="Monthly incident count by specials">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly} margin={{ top:4, right:8, bottom:0, left:-14 }}>
                <CartesianGrid stroke={T.grid} vertical={false} />
                <XAxis dataKey="month" {...ax} />
                <YAxis {...ax} />
                <Tooltip {...tip} />
                <Legend wrapperStyle={{ fontSize:10, color:T.textDim }} />
                {[["PE",T.accent],["Technology",T.green],["Art",T.amber],["Music",T.alert]].map(([k,c]) => (
                  <Line key={k} type="monotone" dataKey={k} stroke={c} strokeWidth={2} dot={{ r:3, fill:c }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Box>

        <Box title="Notes on interpretation">
          <div className="space-y-2.5 text-[11px] leading-[1.6]" style={{ color:T.textDim }}>
            <p><b style={{color:T.text}}>Art low volume.</b>{" "}
              1.63 incidents per logging day. This may reflect a quieter classroom or less consistent form use — data alone cannot distinguish the two.</p>
            <p><b style={{color:T.text}}>Lag and timing accuracy.</b>{" "}
              Teachers who log same-day have near-complete timing data. Music's 6.8h lag is the likely cause of its 21% confirmed-time rate. Timing analysis for Music is unreliable.</p>
            <p><b style={{color:T.text}}>22 records without a specials label.</b>{" "}
              Most are from January before the field was consistently used. Labeled 'Unknown' in all views — not assigned to any teacher.</p>
          </div>
        </Box>
      </div>
    </motion.div>
  );
}

function Followup({ students = [], roadmap = [] }) {
  return (
    <motion.div {...fade} className="space-y-3">
      <div className="flex items-start gap-2.5 rounded p-3"
        style={{ background:T.alert+"0e", border:`1px solid ${T.alert}28` }}>
        <Lock style={{ color:T.alert, width:13, height:13, marginTop:2, flexShrink:0 }} />
        <p className="text-[11px] leading-[1.6]" style={{ color:T.textDim }}>
          <b style={{ color:T.alert }}>Restricted.</b>{" "}
          Student names are for support coordination and administrator use only.
          Do not distribute without redacting names. Incident counts reflect specials logs only —
          cross-reference with homeroom records and referral data before taking action.
          Frequency does not indicate severity or risk classification.
        </p>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.1fr_1fr]">
        <Box title="Students with 4 or more logged incidents"
          sub="Specials records only · Jan 21 – Apr 1, 2026">
          <div className="space-y-2.5 mt-1">
            {students.map((s,i) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px]" style={{ color:T.text }}>{s.name}</span>
                  <Mn className="text-[11px] font-semibold"
                    style={{ color: s.n>=7 ? T.alert : s.n>=5 ? T.amber : T.textDim }}>
                    {s.n}
                  </Mn>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background:T.border }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: s.n>=7 ? T.alert : s.n>=5 ? T.amber : T.accent }}
                    initial={{ width:0 }}
                    animate={{ width:`${(s.n/9)*100}%` }}
                    transition={{ delay:i*0.03, duration:0.35 }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] leading-5" style={{ color:T.textDim }}>
            'Jaxon' and 'Jaxson Anderson' are merged above. Other name variants may not have been caught.
            Use a stable student ID for reliable deduplication.
          </p>
        </Box>

        <div className="space-y-3">
          <Box title="Timing coverage"
            sub="Whether incident time was confirmed or inferred from submission timestamp">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[
                    { name:"Confirmed (142)", value:142, fill:T.green },
                    { name:"Submission time only (106)", value:106, fill:T.muted },
                  ]} dataKey="value" innerRadius={52} outerRadius={76} paddingAngle={3} />
                  <Tooltip {...tip} />
                  <Legend wrapperStyle={{ fontSize:10, color:T.textDim }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Box>

          <Box title="Field completeness" sub="Across all 248 records">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical"
                  data={[
                    { field:"Student name",   pct:100 },
                    { field:"Specials class", pct:91  },
                    { field:"Behavior type",  pct:72  },
                    { field:"Incident time",  pct:57  },
                  ]} margin={{ left:6, right:24 }}>
                  <CartesianGrid stroke={T.grid} horizontal={false} />
                  <XAxis type="number" domain={[0,100]} {...ax} tickFormatter={v=>v+"%"} />
                  <YAxis type="category" dataKey="field" {...ax} width={84} />
                  <Tooltip {...tip} formatter={v=>[v+"%"]} />
                  <Bar dataKey="pct" radius={[0,3,3,0]}>
                    {[100,91,72,57].map((v,i) => (
                      <Cell key={i} fill={v>=90 ? T.green : v>=70 ? T.amber : T.alert} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Box>
        </div>
      </div>

      <Box title="Data and form improvements">
        <div className="space-y-px">
          {roadmap.map((r,i) => (
            <div key={i} className="py-2.5 px-1"
              style={{ borderBottom: i<roadmap.length-1 ? `1px solid ${T.border}` : "none" }}>
              <div className="text-[11px] font-semibold mb-0.5" style={{ color:T.text }}>{r.title}</div>
              <div className="text-[10px] leading-[1.55]" style={{ color:T.textDim }}>{r.body}</div>
            </div>
          ))}
        </div>
      </Box>
    </motion.div>
  );
}

function Outcomes({ students = [], outcomes }) {
  const highSupportHighIncidents = students.filter((s) => (s.chartUseRate ?? 0) >= 0.7 && (s.n ?? s.incidents ?? 0) >= 4);
  const lowSupportHighIncidents = students.filter((s) => (s.chartUseRate ?? 0) < 0.4 && (s.n ?? s.incidents ?? 0) >= 4);
  const repeatAfterContact = students.filter((s) => (s.homeContactRate ?? 0) >= 0.4 && (s.n ?? s.incidents ?? 0) >= 3);

  const cards = [
    { id: "high", title: "High chart use + high incidents", rows: highSupportHighIncidents, color: T.accent },
    { id: "low", title: "Low chart use + high incidents", rows: lowSupportHighIncidents, color: T.alert },
    { id: "contact", title: "Home contact + repeat incidents", rows: repeatAfterContact, color: T.amber },
  ];

  return (
    <motion.div {...fade} className="space-y-3">
      <Box
        title="Fidelity vs outcomes"
        sub="Computed from submitted form rows and grouped for intervention planning">
        <p className="text-[11px] leading-[1.6]" style={{ color: T.textDim }}>
          {outcomes?.notes || "Use this view to identify where implementation fidelity and outcomes diverge. Validate with classroom and support-team context before action."}
        </p>
      </Box>
      <div className="grid gap-3 xl:grid-cols-3">
        {cards.map((card) => (
          <Box key={card.id} title={card.title} right={<Mn style={{ color: card.color }}>{card.rows.length}</Mn>}>
            <div className="space-y-2">
              {card.rows.slice(0, 6).map((row) => (
                <div key={row.name || row.studentId} className="flex items-center justify-between text-[11px]">
                  <span style={{ color: T.text }}>{row.name || row.studentId}</span>
                  <Mn style={{ color: T.textDim }}>{row.n ?? row.incidents}</Mn>
                </div>
              ))}
              {card.rows.length === 0 && (
                <p className="text-[10px]" style={{ color: T.textDim }}>No students in this slice.</p>
              )}
            </div>
          </Box>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Classroom data ───────────────────────────────────────────────────────────
const classrooms = [
  { id:"1-Beckett", label:"1st – Beckett", grade:"1", total:5, chart:60, home:0,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Noncompliance",n:1},{type:"Peer conflict",n:1},{type:"Out of seat",n:1},{type:"Sleeping",n:1},{type:"Unspecified",n:2}],
    students:[{name:"Lucas Pulley",n:2},{name:"Seneca Jackson",n:2},{name:"Infinity Deitz-Hutchison",n:1}],
    weekly:[{week:"Jan W4",n:2},{week:"Mar W13",n:1},{week:"W14",n:2}],
    byDow:{Mon:1,Tue:2,Wed:0,Thu:2,Fri:0},
    specials:{PE:2,Technology:0,Art:1,Music:0,Unknown:2} },
  { id:"1-Cosetti", label:"1st – Cosetti", grade:"1", total:6, chart:33, home:17,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Noncompliance",n:3},{type:"Off-task",n:1},{type:"Emotional distress",n:1},{type:"Physical behavior",n:1},{type:"Out of seat",n:1},{type:"Device misuse",n:1},{type:"Sleeping",n:1},{type:"Unspecified",n:1}],
    students:[{name:"Tyon Buckner",n:2},{name:"Zayana Fisher",n:1},{name:"James Champion",n:1}],
    weekly:[{week:"Jan W4",n:1},{week:"Feb W8",n:1},{week:"Feb W9",n:1},{week:"Mar W10",n:1},{week:"Mar W13",n:1},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:0,Wed:2,Thu:3,Fri:1},
    specials:{PE:0,Technology:2,Art:3,Music:0,Unknown:1} },
  { id:"1-Smith", label:"1st – Smith", grade:"1", total:12, chart:25, home:17,
    behaviors:[{type:"Verbal disruption",n:4},{type:"Noncompliance",n:3},{type:"Off-task",n:1},{type:"Emotional distress",n:2},{type:"Peer conflict",n:4},{type:"Physical behavior",n:1},{type:"Unspecified",n:4}],
    students:[{name:"Sophia Cherry",n:3},{name:"Tiwuan Hardy",n:3},{name:"Reigna Prensa",n:1},{name:"Other",n:5}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:3},{week:"Feb W9",n:3},{week:"Mar W10",n:3},{week:"Mar W11",n:1},{week:"W14",n:1}],
    byDow:{Mon:4,Tue:0,Wed:4,Thu:2,Fri:2},
    specials:{PE:5,Technology:4,Art:0,Music:2,Unknown:1} },
  { id:"1-Worsely", label:"1st – Worsely", grade:"1", total:6, chart:17, home:17,
    behaviors:[{type:"Verbal disruption",n:1},{type:"Noncompliance",n:2},{type:"Off-task",n:4},{type:"Emotional distress",n:1},{type:"Peer conflict",n:1},{type:"Out of seat",n:1},{type:"Sleeping",n:1}],
    students:[{name:"Juelz Crawford",n:2},{name:"Kailee Williams",n:2},{name:"Delilah Zeigler",n:1},{name:"Barrett Boutte",n:1}],
    weekly:[{week:"Feb W7",n:2},{week:"Mar W10",n:1},{week:"W14",n:3}],
    byDow:{Mon:1,Tue:2,Wed:3,Thu:0,Fri:0},
    specials:{PE:0,Technology:2,Art:3,Music:1,Unknown:0} },
  { id:"2-Clark", label:"2nd – Clark", grade:"2", total:22, chart:64, home:18,
    behaviors:[{type:"Verbal disruption",n:8},{type:"Noncompliance",n:7},{type:"Off-task",n:8},{type:"Emotional distress",n:8},{type:"Peer conflict",n:3},{type:"Physical behavior",n:4},{type:"Out of seat",n:2},{type:"Device misuse",n:1},{type:"Unspecified",n:5}],
    students:[{name:"Austin Crowder",n:8},{name:"Mila Moran",n:4},{name:"Noah Hartman",n:2},{name:"Eli Gonzalez",n:2},{name:"Other",n:6}],
    weekly:[{week:"Jan W5",n:4},{week:"Feb W7",n:1},{week:"Feb W8",n:1},{week:"Feb W9",n:3},{week:"Mar W10",n:2},{week:"Mar W11",n:4},{week:"Mar W12",n:1},{week:"Mar W13",n:1},{week:"W14",n:5}],
    byDow:{Mon:9,Tue:1,Wed:7,Thu:2,Fri:3},
    specials:{PE:10,Technology:10,Art:1,Music:1,Unknown:0} },
  { id:"2-Ham", label:"2nd – Ham", grade:"2", total:8, chart:62, home:25,
    behaviors:[{type:"Noncompliance",n:1},{type:"Off-task",n:1},{type:"Emotional distress",n:2},{type:"Peer conflict",n:2},{type:"Physical behavior",n:2},{type:"Out of seat",n:1},{type:"Unspecified",n:4}],
    students:[{name:"Kaiden Horlback",n:4},{name:"Aurelia Gonzalez",n:1},{name:"Travis Oates",n:1},{name:"Ava Cumberlander",n:1},{name:"Isaiah Calcek",n:1}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:1},{week:"Feb W6",n:1},{week:"Feb W7",n:1},{week:"Mar W10",n:3},{week:"Mar W11",n:1}],
    byDow:{Mon:4,Tue:0,Wed:2,Thu:0,Fri:2},
    specials:{PE:4,Technology:3,Art:0,Music:0,Unknown:1} },
  { id:"2-Kennedy", label:"2nd – Kennedy", grade:"2", total:13, chart:31, home:15,
    behaviors:[{type:"Verbal disruption",n:3},{type:"Noncompliance",n:2},{type:"Off-task",n:1},{type:"Emotional distress",n:5},{type:"Peer conflict",n:5},{type:"Physical behavior",n:3},{type:"Out of seat",n:2},{type:"Unspecified",n:2}],
    students:[{name:"Lafayette Joyner",n:6},{name:"Avangeline King",n:1},{name:"Avalynn Lawson",n:1},{name:"Zandarius Hall",n:1},{name:"Other",n:4}],
    weekly:[{week:"Jan W5",n:2},{week:"Feb W7",n:3},{week:"Feb W9",n:1},{week:"Mar W10",n:3},{week:"Mar W12",n:2},{week:"Mar W13",n:2}],
    byDow:{Mon:2,Tue:2,Wed:2,Thu:4,Fri:3},
    specials:{PE:6,Technology:1,Art:4,Music:2,Unknown:0} },
  { id:"2-Pollard", label:"2nd – Pollard", grade:"2", total:5, chart:0, home:0,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Noncompliance",n:1},{type:"Off-task",n:1},{type:"Emotional distress",n:1},{type:"Peer conflict",n:1},{type:"Unspecified",n:2}],
    students:[{name:"Brandon Richardson",n:2},{name:"Henry Brown",n:1},{name:"Jordan Jones",n:1}],
    weekly:[{week:"Jan W4",n:2},{week:"Mar W10",n:1},{week:"Mar W13",n:1},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:3,Wed:0,Thu:2,Fri:0},
    specials:{PE:3,Technology:0,Art:0,Music:0,Unknown:2} },
  { id:"3-DanisMcClain", label:"3rd – Danis/McClain", grade:"3", total:11, chart:36, home:27,
    behaviors:[{type:"Verbal disruption",n:1},{type:"Noncompliance",n:1},{type:"Off-task",n:2},{type:"Emotional distress",n:1},{type:"Peer conflict",n:1},{type:"Out of seat",n:2},{type:"Unspecified",n:6}],
    students:[{name:"Ayden Bazemore",n:2},{name:"Trace Corum",n:2},{name:"Colton Whitt",n:1},{name:"Alexia Hernandez",n:1},{name:"Other",n:5}],
    weekly:[{week:"Jan W4",n:6},{week:"Feb W7",n:1},{week:"Feb W9",n:1},{week:"Mar W13",n:2},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:1,Wed:3,Thu:1,Fri:6},
    specials:{PE:3,Technology:0,Art:1,Music:1,Unknown:6} },
  { id:"3-Jones", label:"3rd – Jones", grade:"3", total:6, chart:50, home:0,
    behaviors:[{type:"Verbal disruption",n:1},{type:"Noncompliance",n:3},{type:"Off-task",n:1},{type:"Peer conflict",n:1},{type:"Device misuse",n:1},{type:"Unspecified",n:1}],
    students:[{name:"King Artist",n:2},{name:"Kameron Batts",n:1},{name:"Harper Hall",n:1},{name:"Arayah Boutte",n:1},{name:"Oliva Sugg",n:1}],
    weekly:[{week:"Jan W5",n:1},{week:"Feb W7",n:1},{week:"Mar W12",n:3},{week:"Mar W13",n:1}],
    byDow:{Mon:0,Tue:2,Wed:0,Thu:3,Fri:1},
    specials:{PE:2,Technology:3,Art:1,Music:0,Unknown:0} },
  { id:"3-Mello", label:"3rd – Mello", grade:"3", total:12, chart:50, home:25,
    behaviors:[{type:"Verbal disruption",n:6},{type:"Noncompliance",n:5},{type:"Off-task",n:1},{type:"Emotional distress",n:4},{type:"Peer conflict",n:7},{type:"Physical behavior",n:2},{type:"Out of seat",n:2},{type:"Unspecified",n:2}],
    students:[{name:"Chester King",n:4},{name:"Ezra Morado",n:3},{name:"Maya Spriggs",n:2},{name:"Noah Thomas",n:1},{name:"Other",n:2}],
    weekly:[{week:"Jan W5",n:2},{week:"Feb W6",n:2},{week:"Feb W7",n:3},{week:"Feb W8",n:1},{week:"Mar W10",n:1},{week:"Mar W12",n:2},{week:"Mar W13",n:1}],
    byDow:{Mon:1,Tue:2,Wed:3,Thu:3,Fri:3},
    specials:{PE:4,Technology:2,Art:3,Music:3,Unknown:0} },
  { id:"4-Bridgers", label:"4th – Bridgers", grade:"4", total:7, chart:14, home:0,
    behaviors:[{type:"Noncompliance",n:1},{type:"Emotional distress",n:4},{type:"Peer conflict",n:3},{type:"Unspecified",n:3}],
    students:[{name:"Indi Coley",n:2},{name:"Kymere McCoy",n:1},{name:"Gideon Allen",n:1},{name:"Other",n:3}],
    weekly:[{week:"Jan W4",n:3},{week:"Feb W6",n:1},{week:"Mar W10",n:3}],
    byDow:{Mon:0,Tue:0,Wed:1,Thu:5,Fri:1},
    specials:{PE:3,Technology:0,Art:0,Music:1,Unknown:3} },
  { id:"4-Dohar", label:"4th – Dohar", grade:"4", total:8, chart:88, home:38,
    behaviors:[{type:"Verbal disruption",n:3},{type:"Noncompliance",n:1},{type:"Off-task",n:1},{type:"Emotional distress",n:2},{type:"Peer conflict",n:1},{type:"Physical behavior",n:4},{type:"Unspecified",n:4}],
    students:[{name:"Braxton Wrestler",n:3},{name:"Declan Costello",n:2},{name:"Travonte Coley",n:1},{name:"Mattix Mooring",n:1},{name:"Chavar Prince",n:1}],
    weekly:[{week:"Jan W5",n:4},{week:"Mar W10",n:3},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:6,Wed:0,Thu:2,Fri:0},
    specials:{PE:6,Technology:2,Art:0,Music:0,Unknown:0} },
  { id:"4-Edwards", label:"4th – Edwards", grade:"4", total:22, chart:36, home:14,
    behaviors:[{type:"Verbal disruption",n:7},{type:"Noncompliance",n:4},{type:"Off-task",n:6},{type:"Emotional distress",n:4},{type:"Peer conflict",n:5},{type:"Physical behavior",n:2},{type:"Out of seat",n:2},{type:"Unspecified",n:7}],
    students:[{name:"London German",n:9},{name:"Ibrie Stanley",n:4},{name:"Doll Brown",n:2},{name:"Connor Sigmund",n:1},{name:"Other",n:6}],
    weekly:[{week:"Jan W4",n:2},{week:"Jan W5",n:1},{week:"Feb W7",n:4},{week:"Feb W9",n:3},{week:"Mar W11",n:3},{week:"Mar W12",n:3},{week:"W14",n:6}],
    byDow:{Mon:8,Tue:6,Wed:6,Thu:0,Fri:2},
    specials:{PE:6,Technology:8,Art:6,Music:0,Unknown:2} },
  { id:"5-Coles", label:"5th – Coles", grade:"5", total:9, chart:33, home:0,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Noncompliance",n:2},{type:"Off-task",n:4},{type:"Emotional distress",n:3},{type:"Physical behavior",n:2},{type:"Sleeping",n:1},{type:"Unspecified",n:2}],
    students:[{name:"Elijah Sanders",n:2},{name:"Lacey Musser",n:1},{name:"Kendra Champion",n:1},{name:"Fynntynn VandenBroeke",n:1},{name:"Other",n:4}],
    weekly:[{week:"Jan W5",n:1},{week:"Feb W6",n:1},{week:"Feb W7",n:2},{week:"Mar W10",n:5}],
    byDow:{Mon:1,Tue:1,Wed:1,Thu:5,Fri:1},
    specials:{PE:6,Technology:1,Art:1,Music:1,Unknown:0} },
  { id:"5-Davis", label:"5th – Davis", grade:"5", total:18, chart:28, home:0,
    behaviors:[{type:"Verbal disruption",n:7},{type:"Noncompliance",n:5},{type:"Off-task",n:6},{type:"Emotional distress",n:2},{type:"Peer conflict",n:6},{type:"Physical behavior",n:3},{type:"Out of seat",n:2},{type:"Device misuse",n:1},{type:"Unspecified",n:7}],
    students:[{name:"Osiel Lopez",n:4},{name:"Liam Howell",n:4},{name:"Jeremiah Edwards",n:2},{name:"Sophia Ponce",n:2},{name:"Kaitlyn Sigmon",n:2},{name:"Other",n:4}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:6},{week:"Feb W8",n:4},{week:"Mar W12",n:3},{week:"Mar W13",n:2},{week:"W14",n:2}],
    byDow:{Mon:0,Tue:6,Wed:3,Thu:6,Fri:3},
    specials:{PE:8,Technology:8,Art:0,Music:1,Unknown:1} },
  { id:"5-Smith", label:"5th – Smith", grade:"5", total:22, chart:32, home:23,
    behaviors:[{type:"Verbal disruption",n:9},{type:"Noncompliance",n:6},{type:"Off-task",n:5},{type:"Emotional distress",n:3},{type:"Peer conflict",n:4},{type:"Physical behavior",n:1},{type:"Out of seat",n:1},{type:"Device misuse",n:2},{type:"Sleeping",n:1},{type:"Unspecified",n:5}],
    students:[{name:"Gabriel Smith",n:6},{name:"Reagan Best",n:3},{name:"Braiden Roa",n:1},{name:"Other",n:12}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:1},{week:"Feb W7",n:3},{week:"Feb W8",n:2},{week:"Feb W9",n:4},{week:"Mar W10",n:2},{week:"Mar W12",n:2},{week:"Mar W13",n:7}],
    byDow:{Mon:11,Tue:3,Wed:7,Thu:0,Fri:1},
    specials:{PE:7,Technology:11,Art:3,Music:0,Unknown:1} },
  { id:"EC", label:"EC (Price)", grade:"EC", total:6, chart:67, home:17,
    behaviors:[{type:"Verbal disruption",n:1},{type:"Noncompliance",n:2},{type:"Off-task",n:2},{type:"Emotional distress",n:3},{type:"Peer conflict",n:1},{type:"Physical behavior",n:2},{type:"Out of seat",n:1},{type:"Sleeping",n:1},{type:"Unspecified",n:1}],
    students:[{name:"Vincent Newberry",n:4},{name:"Cally Boseman",n:1},{name:"Wizdom Grantham",n:1}],
    weekly:[{week:"Feb W6",n:1},{week:"Feb W7",n:2},{week:"Mar W10",n:1},{week:"Mar W11",n:1},{week:"W14",n:1}],
    byDow:{Mon:1,Tue:0,Wed:0,Thu:2,Fri:3},
    specials:{PE:4,Technology:0,Art:2,Music:0,Unknown:0} },
  { id:"K-Fortner", label:"K – Fortner", grade:"K", total:17, chart:47, home:6,
    behaviors:[{type:"Verbal disruption",n:5},{type:"Noncompliance",n:6},{type:"Off-task",n:6},{type:"Emotional distress",n:8},{type:"Peer conflict",n:3},{type:"Physical behavior",n:5},{type:"Out of seat",n:4},{type:"Device misuse",n:1},{type:"Unspecified",n:4}],
    students:[{name:"Jaxon / Jaxson Anderson",n:8},{name:"Kamarri Douglas",n:4},{name:"Knowledge Grantham",n:3},{name:"Caleb Carter",n:1},{name:"Other",n:1}],
    weekly:[{week:"Jan W4",n:1},{week:"Jan W5",n:3},{week:"Feb W7",n:1},{week:"Feb W8",n:1},{week:"Feb W9",n:1},{week:"Mar W10",n:2},{week:"Mar W11",n:2},{week:"Mar W12",n:1},{week:"Mar W13",n:2},{week:"W14",n:3}],
    byDow:{Mon:5,Tue:2,Wed:7,Thu:3,Fri:0},
    specials:{PE:7,Technology:6,Art:2,Music:1,Unknown:1} },
  { id:"K-Helms", label:"K – Helms", grade:"K", total:6, chart:67, home:0,
    behaviors:[{type:"Verbal disruption",n:4},{type:"Noncompliance",n:4},{type:"Off-task",n:1},{type:"Emotional distress",n:2},{type:"Out of seat",n:1},{type:"Device misuse",n:2},{type:"Sleeping",n:1}],
    students:[{name:"Trayvon / Travon Williams",n:4},{name:"Acestin Britton",n:1},{name:"Dontae Champion",n:1}],
    weekly:[{week:"Feb W7",n:1},{week:"Feb W8",n:1},{week:"Feb W9",n:1},{week:"Mar W10",n:2},{week:"Mar W12",n:1}],
    byDow:{Mon:1,Tue:3,Wed:0,Thu:2,Fri:0},
    specials:{PE:2,Technology:3,Art:0,Music:1,Unknown:0} },
  { id:"K-McCormick", label:"K – McCormick", grade:"K", total:7, chart:57, home:0,
    behaviors:[{type:"Verbal disruption",n:2},{type:"Off-task",n:4},{type:"Emotional distress",n:1},{type:"Physical behavior",n:1},{type:"Unspecified",n:2}],
    students:[{name:"Monroe Bush",n:2},{name:"Emilia Fishman",n:1},{name:"Brielle Haskill",n:1},{name:"Christopher Jackson",n:1},{name:"Montonio Hall",n:1},{name:"Other",n:1}],
    weekly:[{week:"Jan W5",n:2},{week:"Mar W10",n:3},{week:"Mar W13",n:1},{week:"W14",n:1}],
    byDow:{Mon:0,Tue:5,Wed:1,Thu:1,Fri:0},
    specials:{PE:5,Technology:1,Art:0,Music:1,Unknown:0} },
  { id:"K-Wing", label:"K – Wing", grade:"K", total:19, chart:63, home:21,
    behaviors:[{type:"Verbal disruption",n:6},{type:"Noncompliance",n:5},{type:"Off-task",n:5},{type:"Emotional distress",n:2},{type:"Peer conflict",n:2},{type:"Physical behavior",n:3},{type:"Out of seat",n:6},{type:"Device misuse",n:3},{type:"Sleeping",n:3},{type:"Unspecified",n:5}],
    students:[{name:"Eternity Deitz-Hutchison",n:5},{name:"Dominic Hardy",n:4},{name:"Foster Langdon",n:4},{name:"Alivia Best",n:1},{name:"Other",n:5}],
    weekly:[{week:"Jan W4",n:2},{week:"Jan W5",n:3},{week:"Feb W7",n:3},{week:"Feb W8",n:4},{week:"Feb W9",n:2},{week:"Mar W12",n:2},{week:"W14",n:3}],
    byDow:{Mon:3,Tue:3,Wed:12,Thu:0,Fri:1},
    specials:{PE:3,Technology:12,Art:0,Music:3,Unknown:1} },
  { id:"K-Wingenroth", label:"K – Wingenroth", grade:"K", total:0, chart:0, home:0, noData:true,
    behaviors:[], students:[], weekly:[],
    byDow:{Mon:0,Tue:0,Wed:0,Thu:0,Fri:0},
    specials:{PE:0,Technology:0,Art:0,Music:0,Unknown:0} },
]

const fallbackDashboardData = {
  kpis: fallbackKpis,
  dq: fallbackDq,
  weekly: fallbackWeekly,
  calFlags: fallbackCalFlags,
  grades: fallbackGrades,
  specialsNorm: fallbackSpecialsNorm,
  dow: fallbackDow,
  behaviors: fallbackBehaviors,
  timeBlocks: fallbackTimeBlocks,
  heatmap: fallbackHeatmap,
  topClasses: fallbackTopClasses,
  monthly: fallbackMonthly,
  consistency: fallbackConsistency,
  students: fallbackStudents,
  roadmap: fallbackRoadmap,
  classrooms,
  outcomes: null,
};

function toClassroomViewModel(classroomRows = []) {
  if (!classroomRows.length) return classrooms;
  return classroomRows.map((row) => {
    const weekly = (row.weekly || []).map((w) => ({ week: w.week, n: w.n ?? w.incidents ?? 0 }));
    const byDowBase = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0 };
    (row.byDay || []).forEach((d) => { byDowBase[d.day] = d.n ?? d.incidents ?? 0; });
    const specials = { PE: 0, Technology: 0, Art: 0, Music: 0, Unknown: 0 };
    (row.bySpecials || []).forEach((s) => { specials[s.label || s.name] = s.value ?? s.n ?? 0; });
    const total = row.total ?? row.incidents ?? 0;
    const chart = row.chart ?? 0;
    const home = row.home ?? 0;

    return {
      id: row.id || row.name,
      label: row.label || row.name,
      grade: row.grade || "Unknown",
      total,
      chart,
      home,
      behaviors: (row.behaviors || row.byBehavior || []).map((b) => ({ type: b.type || b.label, n: b.n ?? b.value ?? 0 })),
      students: (row.students || row.byStudent || []).map((s) => ({ name: s.name || s.studentId, n: s.n ?? s.incidents ?? 0 })),
      weekly,
      byDow: byDowBase,
      specials,
      noData: total === 0,
    };
  });
}

// ─── Classroom view (teacher-facing) ─────────────────────────────────────────
function ClassroomView({ onBack, classrooms }) {
  if (!classrooms?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background:T.bg, color:T.text }}>
        <div className="rounded px-4 py-3 text-[12px]" style={{ background:T.surface, border:`1px solid ${T.border}` }}>
          No classroom records available.
        </div>
      </div>
    );
  }

  const [selected, setSelected] = useState(classrooms[0].id);
  const cls = classrooms.find(c => c.id === selected) || classrooms[0];

  // Bug 2 fix: safe max — don't assume students[0] is the largest
  const maxStudent = useMemo(
    () => Math.max(1, ...cls.students.map(s => s.n)),
    [cls]
  );

  // Bug 5 fix: memoize expensive max computations
  const maxWeekly = useMemo(
    () => Math.max(1, ...cls.weekly.map(w => w.n)),
    [cls]
  );

  const dowData = ["Mon","Tue","Wed","Thu","Fri"].map(d => ({ day:d, n: cls.byDow[d] || 0 }));
  const maxDow  = useMemo(() => Math.max(1, ...dowData.map(d => d.n)), [cls]);

  const specData = Object.entries(cls.specials)
    .filter(([,v]) => v > 0)
    .map(([k,v]) => ({ name:k, n:v }));

  return (
    <div className="min-h-screen" style={{ background:T.bg, color:T.text }}>
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={onBack}
            className="text-[11px] px-2.5 py-1.5 rounded"
            style={{ background:T.surface, border:`1px solid ${T.border}`, color:T.textDim }}>
            ← Admin view
          </button>
          <div>
            <div className="text-[11px]" style={{ color:T.textDim }}>
              Wayne STEM Academy · Classroom view · Jan 21 – Apr 1, 2026
            </div>
            <h1 className="text-xl font-semibold" style={{ color:T.textBright, ...MONO }}>
              Specials behavior by classroom
            </h1>
          </div>
        </div>

        {/* Class selector — grouped by grade */}
        <div className="mb-4 space-y-2">
          {["K","1","2","3","4","5","EC"].map(grade => {
            const gradeClasses = classrooms.filter(c => c.grade === grade);
            if (!gradeClasses.length) return null;
            return (
              <div key={grade} className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-semibold uppercase tracking-wide w-6 text-right flex-shrink-0"
                  style={{ color:T.textDim }}>{grade === "EC" ? "EC" : grade+"th"}</span>
                {gradeClasses.map(c => (
                  <button key={c.id} onClick={() => setSelected(c.id)}
                    className="text-[11px] px-2.5 py-1 rounded transition-colors"
                    style={{
                      background: selected===c.id ? T.accent+"22" : T.surface,
                      border: `1px solid ${selected===c.id ? T.accent+"66" : T.border}`,
                      color: selected===c.id ? T.accent : c.noData ? T.muted : T.textDim,
                      fontWeight: selected===c.id ? 600 : 400,
                    }}>
                    {c.label}{c.noData ? " –" : ""}
                  </button>
                ))}
              </div>
            );
          })}
          <p className="text-[10px] pl-8" style={{ color:T.muted }}>
            Classes marked "–" have no incidents logged in this dataset.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={cls.id} {...fade} className="space-y-3">

            {/* No data state */}
            {cls.noData ? (
              <div className="rounded-lg p-6 text-center"
                style={{ background:T.surface, border:`1px solid ${T.border}` }}>
                <div className="text-[13px] font-semibold mb-1" style={{ color:T.textBright }}>
                  No incidents logged for {cls.label}
                </div>
                <p className="text-[11px]" style={{ color:T.textDim }}>
                  This class has no records in the Jan 21 – Apr 1, 2026 dataset.
                  This may mean no incidents occurred, or that the form was not used for this class during this period.
                </p>
              </div>
            ) : (<>

            {/* Class KPIs */}
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {[
                { label:"Total incidents",  value: cls.total, sub:"in this class" },
                { label:"Color chart used", value: cls.chart+"%",
                  sub:"of incidents", flag: cls.chart < 30 },
                { label:"Home contacted",   value: cls.home+"%",
                  sub:"of incidents", flag: cls.home === 0 },
                { label:"Specials logged",  value: Object.values(cls.specials).filter(v=>v>0).length,
                  sub:"of 4 specials" },
              ].map(k => (
                <div key={k.label} className="rounded p-3"
                  style={{ background:T.surface, border:`1px solid ${k.flag ? T.alert+"55" : T.border}` }}>
                  <div className="text-[10px] uppercase tracking-wide mb-1.5" style={{ color:T.textDim }}>
                    {k.label}
                  </div>
                  <Mn className="text-[22px] font-bold block"
                    style={{ color: k.flag ? T.alert : T.textBright }}>
                    {k.value}
                  </Mn>
                  <div className="text-[10px] mt-0.5" style={{ color:T.textDim }}>{k.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 xl:grid-cols-[1.1fr_1fr]">
              {/* Behavior breakdown */}
              <Box title="Behavior types" sub={`${cls.label} · all logged incidents`}>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cls.behaviors} layout="vertical" margin={{ left:12, right:8 }}>
                      <CartesianGrid stroke={T.grid} horizontal={false} />
                      <XAxis type="number" {...ax} />
                      <YAxis type="category" dataKey="type" {...ax} width={122} />
                      <Tooltip {...tip} />
                      <Bar dataKey="n" radius={[0,3,3,0]}>
                        {cls.behaviors.map((d,i) => (
                          <Cell key={d.type} fill={d.type==="Unspecified" ? T.muted : T.series[i%T.series.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Box>

              {/* Students */}
              <Box title="Students with logged incidents" sub="Specials records only for this class">
                <div className="space-y-2.5 mt-1">
                  {cls.students.map((s,i) => (
                    <div key={s.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px]" style={{ color: s.name==="Other" ? T.textDim : T.text }}>
                          {s.name}
                        </span>
                        <Mn className="text-[11px] font-semibold"
                          style={{ color: s.n>=5 ? T.alert : s.n>=3 ? T.amber : T.textDim }}>
                          {s.n}
                        </Mn>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background:T.border }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: s.name==="Other" ? T.muted : s.n>=5 ? T.alert : s.n>=3 ? T.amber : T.accent }}
                          initial={{ width:0 }}
                          animate={{ width:`${(s.n / maxStudent)*100}%` }}
                          transition={{ delay:i*0.04, duration:0.35 }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] leading-5" style={{ color:T.textDim }}>
                  Specials-only data. Does not include homeroom or office referral records.
                  "Other" = remaining students with 1 incident each.
                </p>
              </Box>
            </div>

            <div className="grid gap-3 xl:grid-cols-2">
              {/* By day of week */}
              <Box title="Incidents by day of week" sub="Raw count · not normalized">
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dowData} margin={{ top:4, right:4, bottom:0, left:-14 }}>
                      <CartesianGrid stroke={T.grid} vertical={false} />
                      <XAxis dataKey="day" {...ax} />
                      <YAxis {...ax} />
                      <Tooltip {...tip} />
                      <Bar dataKey="n" radius={[3,3,0,0]}>
                        {dowData.map(d => (
                          <Cell key={d.day} fill={d.n===maxDow && maxDow>0 ? T.alert : T.accent} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Box>

              {/* By specials */}
              <Box title="Incidents by specials class" sub="Which teachers logged incidents for this classroom">
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={specData} margin={{ top:4, right:4, bottom:0, left:-14 }}>
                      <CartesianGrid stroke={T.grid} vertical={false} />
                      <XAxis dataKey="name" {...ax} />
                      <YAxis {...ax} />
                      <Tooltip {...tip} />
                      <Bar dataKey="n" radius={[3,3,0,0]}>
                        {specData.map(d => (
                          <Cell key={d.name} fill={T[SPEC_COLORS[d.name]] || T.muted} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Box>
            </div>

            {/* Weekly trend */}
            <Box title="Incidents by week" sub="Raw count — weeks with no incidents not shown">
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cls.weekly} margin={{ top:4, right:4, bottom:0, left:-14 }}>
                    <CartesianGrid stroke={T.grid} vertical={false} />
                    <XAxis dataKey="week" {...ax} tick={{ ...ax.tick, fontSize:9 }} />
                    <YAxis {...ax} />
                    <Tooltip {...tip} />
                    <Bar dataKey="n" radius={[3,3,0,0]}>
                      {cls.weekly.map((d,i) => (
                        <Cell key={d.week}
                          fill={d.n === maxWeekly ? T.alert : T.accent} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Box>

            {/* Context note */}
            <div className="rounded p-3" style={{ background:T.surfaceHi, border:`1px solid ${T.border}` }}>
              <p className="text-[10px] leading-[1.6]" style={{ color:T.textDim }}>
                <b style={{ color:T.text }}>About this view.</b>{" "}
                Incidents shown here were logged by specials teachers (P.E., Technology, Art, Music) during
                class time with this homeroom. They do not represent the full behavioral picture for this class —
                homeroom incidents and office referrals are not included in this dataset.
                Color chart usage and home contact rates reflect specials teacher practice, not homeroom practice.
              </p>
            </div>

            </>)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


export default function BehaviorDashboard() {
  const [tab,  setTab]  = useState("overview");
  const [mode, setMode] = useState("admin"); // "admin" | "classroom"
  const { data } = useDashboardData();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch(_) {} };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background:T.bg, color:T.text }}>
        <div className="rounded px-4 py-3 text-[12px]" style={{ background:T.surface, border:`1px solid ${T.border}` }}>
          Loading dashboard data…
        </div>
      </div>
    );
  }

  if (mode === "classroom") {
    return <ClassroomView classrooms={classroomRows} onBack={() => setMode("admin")} />;
  }

  return (
    <div className="min-h-screen" style={{ background:T.bg, color:T.text }}>
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-6">

        {/* Header — plain, specific, no tagline */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] mb-1" style={{ color:T.textDim }}>
              Wayne STEM Academy · Specials behavior log · Jan 21 – Apr 1, 2026
            </div>
            <h1 className="text-xl font-semibold mb-1" style={{ color:T.textBright, ...MONO }}>
              Student behavior incidents
            </h1>
            <p className="text-[12px]" style={{ color:T.textDim }}>
              248 incidents across P.E., Technology, Art, and Music.
              Rates normalized by the WSA school calendar. Data quality limitations are noted throughout.
            </p>
          </div>
          <button onClick={() => setMode("classroom")}
            className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded mt-1"
            style={{ background:T.surface, border:`1px solid ${T.border}`, color:T.textDim, whiteSpace:"nowrap" }}>
            Classroom view →
          </button>
        </div>

        {error && (
          <div className="rounded p-2.5 mb-4 text-[11px]" style={{ background:T.alert+"10", border:`1px solid ${T.alert}44`, color:T.textDim }}>
            Live data could not be loaded. Showing the latest available dashboard dataset.
          </div>
        )}

        {/* KPIs — no icons, no motion stagger on every card, just the numbers */}
        <div className="grid grid-cols-2 gap-2 mb-4 md:grid-cols-5">
          {dashboard.kpis.map((k,i) => (
            <motion.div key={k.label}
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay:i*0.04, duration:0.2 }}>
              <div className="rounded p-3 h-full"
                style={{ background:T.surface, border:`1px solid ${k.flag ? T.alert+"55" : T.border}` }}>
                <div className="text-[10px] uppercase tracking-wide mb-1.5" style={{ color:T.textDim }}>
                  {k.label}
                </div>
                <Mn className="text-[22px] font-bold block"
                  style={{ color: k.flag ? T.alert : k.value==="41%" ? T.amber : T.textBright }}>
                  {k.value}
                </Mn>
                <div className="text-[10px] mt-0.5" style={{ color:T.textDim }}>{k.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data quality strip */}
        <div className="rounded p-3 mb-4"
          style={{ background:T.surfaceHi, border:`1px solid ${T.border}`, borderLeft:`2px solid ${T.amber}` }}>
          <div className="text-[10px] font-semibold uppercase tracking-wide mb-2.5" style={{ color:T.amber }}>
            Data limitations affecting interpretation
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {dashboard.dq.map(q => (
              <div key={q.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px]" style={{ color:T.textDim }}>{q.label}</span>
                  <Mn className="text-[10px] font-semibold" style={{ color:T[q.color] || T.textDim }}>{q.n}</Mn>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background:T.muted+"40" }}>
                  <div className="h-full rounded-full" style={{ width:`${Math.max(q.pct,0.5)}%`, background:T[q.color] || T.muted }} />
                </div>
                <div className="text-[10px] mt-0.5" style={{ color:T.textDim+"99" }}>{q.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 max-w-xl">
          <TabNav active={tab} onChange={setTab} />
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === "overview"  && <Overview  key="overview"  />}
          {tab === "timing"    && <Timing    key="timing"    />}
          {tab === "coverage"  && <Coverage  key="coverage"  />}
          {tab === "outcomes"  && <Outcomes students={data?.students} outcomes={data?.outcomes} key="outcomes"  />}
          {tab === "followup"  && <Followup  key="followup"  />}
        </AnimatePresence>
      </div>
    </div>
  );
}
