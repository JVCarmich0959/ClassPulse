import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import Panel from '../components/Panel';

export default function OverviewView({ weekly, grades, specialsNorm, topClasses, behaviors }) {
  return (
    <div className="viewGrid twoCol">
      <Panel title="Weekly incident rate">
        <div className="chartBox">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
              <XAxis dataKey="week" stroke="#9db2d7" />
              <YAxis stroke="#9db2d7" />
              <Tooltip />
              <Line type="monotone" dataKey="incidents" stroke="#5fa7ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Incidents by grade">
        <div className="chartBox">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={grades}>
              <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
              <XAxis dataKey="grade" stroke="#9db2d7" />
              <YAxis stroke="#9db2d7" />
              <Tooltip />
              <Bar dataKey="incidents" fill="#7fd2a5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Incidents per logging day by specials">
        <ul className="plainList">
          {specialsNorm.map((s) => (
            <li key={s.specials}>
              <span>{s.specials}</span>
              <strong>{s.incidentsPerDay.toFixed(1)}</strong>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Top classes by incident count">
        <ul className="plainList">
          {topClasses.map((c) => (
            <li key={c.classroom}>
              <span>{c.classroom}</span>
              <strong>{c.incidents}</strong>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Observed behavior types" subtitle="Across specials logging records">
        <div className="chartBox">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={behaviors} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
              <XAxis type="number" stroke="#9db2d7" />
              <YAxis dataKey="behavior" type="category" stroke="#9db2d7" width={140} />
              <Tooltip />
              <Bar dataKey="incidents" fill="#5fa7ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}
