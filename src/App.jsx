import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ClassroomView } from './views/ClassroomView';
import { CoverageView } from './views/CoverageView';
import { FollowupView } from './views/FollowupView';
import { OverviewView } from './views/OverviewView';
import { TimingView } from './views/TimingView';
import { DataQualityStrip } from './components/DataQualityStrip';
import { KpiGrid } from './components/KpiGrid';
import { TabNav } from './components/TabNav';
import { useDashboardData } from './hooks/useDashboardData';
import { MONO, T } from './theme';

export default function App() {
  const [tab, setTab] = useState('overview');
  const [mode, setMode] = useState('admin');
  const { data, loading, error } = useDashboardData();

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  if (mode === 'classroom') return <ClassroomView onBack={() => setMode('admin')} classrooms={data.classrooms} />;

  return (
    <div className="min-h-screen" style={{ background: T.bg, color: T.text }}>
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] mb-1" style={{ color: T.textDim }}>Wayne STEM Academy · Specials behavior log · Jan 21 – Apr 1, 2026</div>
            <h1 className="text-xl font-semibold mb-1" style={{ color: T.textBright, ...MONO }}>Scholar behavior incidents</h1>
            <p className="text-[12px]" style={{ color: T.textDim }}>248 incidents across P.E., Technology, Art, and Music. Rates normalized by the WSA school calendar. Data quality limitations are noted throughout.</p>
          </div>
          <button onClick={() => setMode('classroom')} className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded mt-1" style={{ background: T.surface, border: `1px solid ${T.border}`, color: T.textDim, whiteSpace: 'nowrap' }}>Classroom view →</button>
        </div>

        {loading && <div className="text-[11px] mb-3" style={{ color: T.textDim }}>Loading dashboard data…</div>}
        {error && <div className="text-[11px] mb-3" style={{ color: T.alert }}>Live data unavailable: {error}</div>}

        <KpiGrid kpis={data.kpis} />
        <DataQualityStrip dq={data.dq} />

        <div className="mb-4 max-w-xl"><TabNav active={tab} onChange={setTab} /></div>

        <AnimatePresence mode="wait">
          {tab === 'overview' && <OverviewView key="overview" data={data} />}
          {tab === 'timing' && <TimingView key="timing" data={data} />}
          {tab === 'coverage' && <CoverageView key="coverage" data={data} />}
          {tab === 'followup' && <FollowupView key="followup" data={data} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
