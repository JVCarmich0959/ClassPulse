import { useMemo } from 'react';
import Panel from '../components/Panel';
import Note from '../components/Note';

export default function FollowupView({ students, roadmap }) {
  const maxIncidents = useMemo(
    () => (students.length ? Math.max(...students.map((student) => student.incidents)) : 0),
    [students]
  );

  return (
    <div className="viewGrid twoCol">
      <Panel title="Restricted student notice">
        <Note tone="warning" title="Restricted student data">
          Student-level records are restricted for planning use by authorized staff. Do not redistribute outside school intervention teams.
        </Note>
      </Panel>

      <Panel title="Students with 4+ logged incidents">
        <ul className="studentBars">
          {students
            .filter((student) => student.incidents >= 4)
            .map((student) => (
              <li key={student.studentId}>
                <div className="studentBarLabel">
                  <span>{student.studentId}</span>
                  <strong>{student.incidents}</strong>
                </div>
                <div className="studentBarTrack">
                  <span
                    className="studentBarFill"
                    style={{ width: `${maxIncidents > 0 ? (student.incidents / maxIncidents) * 100 : 0}%` }}
                  />
                </div>
              </li>
            ))}
        </ul>
      </Panel>

      <Panel title="Timing coverage">
        <ul className="plainList">
          {students.map((student) => (
            <li key={`${student.studentId}-timing`}>
              <span>{student.studentId}</span>
              <strong>{Math.round(student.timingCoverage * 100)}%</strong>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Field completeness">
        <ul className="plainList">
          {students.map((student) => (
            <li key={`${student.studentId}-field`}>
              <span>{student.studentId}</span>
              <strong>{Math.round(student.fieldCompleteness * 100)}%</strong>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="System improvements / roadmap">
        <ul className="roadmap">
          {roadmap.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
