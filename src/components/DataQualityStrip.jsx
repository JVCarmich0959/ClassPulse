import { AlertTriangle } from 'lucide-react';

export default function DataQualityStrip({ items }) {
  return (
    <section className="dqStrip">
      <div className="dqHeading">
        <AlertTriangle size={16} />
        <strong>Data limitations affecting interpretation</strong>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
