export default function ConsistencyTable({ rows }) {
  return (
    <table className="consistencyTable">
      <thead>
        <tr>
          <th>Specials team</th>
          <th>Expected logging days</th>
          <th>Logged days</th>
          <th>Field completeness</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.team}>
            <td>{row.team}</td>
            <td>{row.expectedDays}</td>
            <td>{row.loggedDays}</td>
            <td>{Math.round(row.completeness * 100)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
