export default function KpiGrid({ items }) {
  return (
    <div className="kpiGrid">
      {items.map((item) => (
        <article key={item.label} className="kpiCard">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </div>
  );
}
