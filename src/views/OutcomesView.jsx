import { useMemo } from 'react';
import Panel from '../components/Panel';

export default function OutcomesView({ students }) {
  const buckets = useMemo(() => {
    const highChartHighIncidents = students.filter((s) => s.chartUseRate >= 0.7 && s.incidents >= 6);
    const lowChartHighIncidents = students.filter((s) => s.chartUseRate < 0.4 && s.incidents >= 5);
    const highChartDeclining = students.filter((s) => s.chartUseRate >= 0.7 && s.trend === 'declining');
    const contactRepeat = students.filter((s) => s.homeContactRate >= 0.4 && s.repeatsAfterContact >= 3);

    return [
      {
        key: 'high-high',
        title: 'High chart use + high incidents',
        description: 'Students receiving frequent chart use but still showing elevated incidents.',
        count: highChartHighIncidents.length,
        records: highChartHighIncidents
      },
      {
        key: 'low-high',
        title: 'Low chart use + high incidents',
        description: 'Students with high incidents and lower chart use consistency.',
        count: lowChartHighIncidents.length,
        records: lowChartHighIncidents
      },
      {
        key: 'high-declining',
        title: 'High chart use + declining incidents',
        description: 'Potential response signal where incidents are decreasing with high chart use.',
        count: highChartDeclining.length,
        records: highChartDeclining
      },
      {
        key: 'contact-repeat',
        title: 'Home contact + repeat incidents',
        description: 'Students with documented home contact and continuing repeat incidents.',
        count: contactRepeat.length,
        records: contactRepeat
      }
    ];
  }, [students]);

  return (
    <div className="viewGrid singleCol">
      <Panel title="Fidelity vs outcomes">
        <p className="muted">
          This section is structured for future computed joins with form-level records. Current values are placeholder-derived from static data.
        </p>
      </Panel>

      <div className="outcomeCards">
        {buckets.map((bucket) => (
          <Panel key={bucket.key} title={bucket.title} subtitle={bucket.description}>
            <div className="bucketCount">{bucket.count}</div>
            <ul className="plainList compact">
              {bucket.records.map((record) => (
                <li key={record.studentId}>
                  <span>{record.studentId}</span>
                  <strong>{record.incidents} incidents</strong>
                </li>
              ))}
              {bucket.records.length === 0 && (
                <li>
                  <span>No students in this slice.</span>
                </li>
              )}
            </ul>
          </Panel>
        ))}
      </div>
    </div>
  );
}
