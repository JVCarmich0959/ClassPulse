import { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import Panel from '../components/Panel';
import KpiGrid from '../components/KpiGrid';
import Note from '../components/Note';

export default function ClassroomView({ classrooms, onBack }) {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState(classrooms[0] ?? null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return classrooms;
    return classrooms.filter(
      (c) => c.name.toLowerCase().includes(term) || `grade ${c.grade}`.includes(term)
    );
  }, [classrooms, search]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, classroom) => {
      const key = `Grade ${classroom.grade}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(classroom);
      return acc;
    }, {});
  }, [filtered]);

  const hasData = (selectedClass?.incidents ?? 0) > 0;

  return (
    <div className="classroomMode">
      <div className="modeHeader">
        <button type="button" className="ghostButton" onClick={onBack}>
          Back to admin dashboard
        </button>
      </div>

      <div className="classroomLayout">
        <aside className="classroomListPanel panel">
          <h3>Classroom explorer</h3>
          <p className="muted">Search and select a class. Grouped by grade for quick scanning.</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search class or grade"
            className="searchInput"
          />
          <div className="classroomGroups">
            {Object.entries(grouped).map(([group, items]) => (
              <div key={group}>
                <h4>{group}</h4>
                {items.map((classroom) => (
                  <button
                    key={classroom.name}
                    type="button"
                    className={selectedClass?.name === classroom.name ? 'listButton active' : 'listButton'}
                    onClick={() => setSelectedClass(classroom)}
                  >
                    <span>{classroom.name}</span>
                    <strong>{classroom.incidents}</strong>
                  </button>
                ))}
              </div>
            ))}
            {filtered.length === 0 && <p className="muted">No classrooms match this search.</p>}
          </div>
        </aside>

        <div className="classroomContent">
          {selectedClass && (
            <>
              <Panel title={selectedClass.name} subtitle="Specials-only incident documentation scope">
                <KpiGrid
                  items={[
                    { label: 'Total incidents', value: selectedClass.incidents },
                    { label: 'Students flagged', value: selectedClass.studentsFlagged },
                    { label: 'Grade', value: selectedClass.grade }
                  ]}
                />
              </Panel>

              {!hasData && (
                <Panel title="No incident data for this classroom">
                  <Note>
                    This classroom has no logged specials incidents in the current dataset window.
                  </Note>
                </Panel>
              )}

              {hasData && (
                <div className="viewGrid twoCol">
                  <Panel title="Behavior breakdown">
                    <div className="chartBox">
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={selectedClass.byBehavior}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
                          <XAxis dataKey="label" stroke="#9db2d7" />
                          <YAxis stroke="#9db2d7" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#5fa7ff" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>

                  <Panel title="Student breakdown">
                    <ul className="plainList">
                      {selectedClass.byStudent.map((student) => (
                        <li key={student.studentId}>
                          <span>{student.studentId}</span>
                          <strong>{student.incidents}</strong>
                        </li>
                      ))}
                    </ul>
                  </Panel>

                  <Panel title="Incidents by day of week">
                    <div className="chartBox">
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={selectedClass.byDay}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
                          <XAxis dataKey="day" stroke="#9db2d7" />
                          <YAxis stroke="#9db2d7" />
                          <Tooltip />
                          <Bar dataKey="incidents" fill="#7fd2a5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>

                  <Panel title="Incidents by specials class">
                    <div className="chartBox">
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={selectedClass.bySpecials}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
                          <XAxis dataKey="label" stroke="#9db2d7" />
                          <YAxis stroke="#9db2d7" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#ffcf70" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>

                  <Panel title="Incidents by week">
                    <div className="chartBox">
                      <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={selectedClass.weekly}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#294567" />
                          <XAxis dataKey="week" stroke="#9db2d7" />
                          <YAxis stroke="#9db2d7" />
                          <Tooltip />
                          <Line type="monotone" dataKey="incidents" stroke="#ff8a8a" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
