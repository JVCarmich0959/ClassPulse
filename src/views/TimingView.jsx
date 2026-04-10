import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import Panel from '../components/Panel';
import HeatmapGrid from '../components/HeatmapGrid';

export default function TimingView({ data }) {
  const { dow, timeBlocks, heatmap } = data;

  return (
    <div className="viewGrid twoCol">
      <Panel title="Incidents per school day by weekday">
        <div className="chartBox">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
              <XAxis dataKey="day" stroke="#9db2d7" />
              <YAxis stroke="#9db2d7" />
              <Tooltip />
              <Bar dataKey="incidents" fill="#5fa7ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Incident time distribution">
        <div className="chartBox">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={timeBlocks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
              <XAxis dataKey="block" stroke="#9db2d7" />
              <YAxis stroke="#9db2d7" />
              <Tooltip />
              <Bar dataKey="incidents" fill="#7fd2a5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel title="Heatmap by day and hour block" subtitle="Higher values indicate concentrated incident windows">
        <HeatmapGrid items={heatmap} />
      </Panel>
    </div>
  );
}
