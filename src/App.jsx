import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { School, ArrowRight } from 'lucide-react';
import KpiGrid from './components/KpiGrid';
import DataQualityStrip from './components/DataQualityStrip';
import TabNav from './components/TabNav';
import Panel from './components/Panel';
import Note from './components/Note';
import OverviewView from './views/OverviewView';
import TimingView from './views/TimingView';
import CoverageView from './views/CoverageView';
import OutcomesView from './views/OutcomesView';
import FollowupView from './views/FollowupView';
import ClassroomView from './views/ClassroomView';
import { useDashboardData } from './hooks/useDashboardData';

const TABS = [
  'System overview',
  'Timing & transitions',
  'Fidelity & coverage',
  'Fidelity vs outcomes',
  'Student planning'
];

export default function App() {
  const [mode, setMode] = useState('admin');
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { data, loading, error } = useDashboardData();

  const tabContent = useMemo(() => {
    if (!data) return null;

    switch (activeTab) {
      case 'System overview':
        return <OverviewView data={data} />;
      case 'Timing & transitions':
        return <TimingView data={data} />;
      case 'Fidelity & coverage':
        return <CoverageView data={data} />;
      case 'Fidelity vs outcomes':
        return <OutcomesView data={data} />;
      case 'Student planning':
        return <FollowupView data={data} />;
      default:
        return null;
    }
  }, [activeTab, data]);

  if (mode === 'classroom' && data) {
    return (
      <main className="appShell">
        <header className="appHeader">
          <div className="brand">
            <School size={18} />
            <div>
              <h1>ClassPulse</h1>
              <p>Shared behavior documentation and response system</p>
            </div>
          </div>
        </header>
        <ClassroomView classrooms={data.classrooms} onBack={() => setMode('admin')} />
      </main>
    );
  }

  return (
    <main className="appShell">
      <header className="appHeader">
        <div className="brand">
          <School size={18} />
          <div>
            <h1>ClassPulse</h1>
            <p>Shared behavior documentation and response system</p>
          </div>
        </div>
        {!loading && !error && data && (
          <button type="button" className="ghostButton" onClick={() => setMode('classroom')}>
            Open classroom explorer <ArrowRight size={16} />
          </button>
        )}
      </header>

      {loading && (
        <Panel title="Loading dashboard data">
          <p className="muted">Loading records from the configured data source.</p>
        </Panel>
      )}

      {!loading && error && (
        <Panel title="Data load issue">
          <Note tone="warning">{error}</Note>
          <p className="muted">Check the live data endpoint configuration and try again.</p>
        </Panel>
      )}

      {!loading && !error && (!data || data.weekly.length === 0) && (
        <Panel title="No data available">
          <p className="muted">No incident rows were returned for the current window.</p>
        </Panel>
      )}

      {!loading && !error && data && data.weekly.length > 0 && (
        <>
          <KpiGrid items={data.kpis} />
          <DataQualityStrip items={data.dq} />
          <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="contentArea"
          >
            {tabContent}
          </motion.section>
        </>
      )}
    </main>
  );
}
