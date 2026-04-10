import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from 'recharts';
import Panel from '../components/Panel';
import Note from '../components/Note';
import ConsistencyTable from '../components/ConsistencyTable';

export default function CoverageView({ data }) {
  const { specialsNorm, consistency, monthly } = data;

  return (
    <div className="viewGrid twoCol">
      <Panel title="Specials logging coverage">
        <div className="chartBox">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={specialsNorm}>
              <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
              <XAxis dataKey="specials" stroke="#9db2d7" />
              <YAxis stroke="#9db2d7" domain={[0, 1]} />
              <Tooltip formatter={(value) => `${Math.round(value * 100)}%`} />
              <Bar dataKey="coverage" fill="#5fa7ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Consistency table">
        <ConsistencyTable rows={consistency} />
      </Panel>

      <Panel title="Monthly incident count by specials">
        <div className="chartBox">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
              <XAxis dataKey="month" stroke="#9db2d7" />
              <YAxis stroke="#9db2d7" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Art" stroke="#7fd2a5" />
              <Line type="monotone" dataKey="Music" stroke="#5fa7ff" />
              <Line type="monotone" dataKey="PE" stroke="#ffcf70" />
              <Line type="monotone" dataKey="Library" stroke="#d79fff" />
              <Line type="monotone" dataKey="Technology" stroke="#ff8a8a" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Interpretation notes">
        <Note>
          Coverage and incident rates should be interpreted together. Lower coverage can mask incident frequency rather than reflect improved behavior.
        </Note>
        <Note tone="warning">
          Library and Music show lower logging consistency, which can understate incident timing and follow-up trends.
        </Note>
      </Panel>
    </div>
  );
}
