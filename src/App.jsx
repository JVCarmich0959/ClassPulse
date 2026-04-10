import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { School, ArrowRight } from 'lucide-react';
import {
  kpis,
  dq,
  weekly,
  grades,
  specialsNorm,
  dow,
  behaviors,
  timeBlocks,
  heatmap,
  topClasses,
  monthly,
  consistency,
  students,
  roadmap,
  classrooms
} from './data/dashboardData';
import KpiGrid from './components/KpiGrid';
import DataQualityStrip from './components/DataQualityStrip';
import TabNav from './components/TabNav';
import OverviewView from './views/OverviewView';
import TimingView from './views/TimingView';
import CoverageView from './views/CoverageView';
import OutcomesView from './views/OutcomesView';
import FollowupView from './views/FollowupView';
import ClassroomView from './views/ClassroomView';

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

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'System overview':
        return (
          <OverviewView
            weekly={weekly}
            grades={grades}
            specialsNorm={specialsNorm}
            topClasses={topClasses}
            behaviors={behaviors}
          />
        );
      case 'Timing & transitions':
        return <TimingView dow={dow} timeBlocks={timeBlocks} heatmap={heatmap} />;
      case 'Fidelity & coverage':
        return <CoverageView specialsNorm={specialsNorm} consistency={consistency} monthly={monthly} />;
      case 'Fidelity vs outcomes':
        return <OutcomesView students={students} />;
      case 'Student planning':
        return <FollowupView students={students} roadmap={roadmap} />;
      default:
        return null;
    }
  }, [activeTab]);

  if (mode === 'classroom') {
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
        <ClassroomView classrooms={classrooms} onBack={() => setMode('admin')} />
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
        <button type="button" className="ghostButton" onClick={() => setMode('classroom')}>
          Open classroom explorer <ArrowRight size={16} />
        </button>
      </header>

      <KpiGrid items={kpis} />
      <DataQualityStrip items={dq} />
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
    </main>
  );
}
