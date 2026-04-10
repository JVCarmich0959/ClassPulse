import { useMemo } from 'react';

export default function HeatmapGrid({ items }) {
  const { days, hours, map, maxValue } = useMemo(() => {
    const daySet = [...new Set(items.map((item) => item.day))];
    const hourSet = [...new Set(items.map((item) => item.hour))];
    const valueMap = new Map(items.map((item) => [`${item.day}-${item.hour}`, item.value]));
    const max = items.length > 0 ? Math.max(...items.map((item) => item.value)) : 0;
    return { days: daySet, hours: hourSet, map: valueMap, maxValue: max };
  }, [items]);

  return (
    <div className="heatmapWrap">
      <div className="heatmapHeaderRow">
        <span />
        {hours.map((hour) => (
          <span key={hour}>{hour}</span>
        ))}
      </div>
      {days.map((day) => (
        <div className="heatmapRow" key={day}>
          <strong>{day}</strong>
          {hours.map((hour) => {
            const value = map.get(`${day}-${hour}`) ?? 0;
            const intensity = maxValue > 0 ? value / maxValue : 0;
            return (
              <div
                key={`${day}-${hour}`}
                className="heatCell"
                style={{ backgroundColor: `rgba(95, 167, 255, ${0.12 + intensity * 0.68})` }}
                title={`${day} ${hour}: ${value}`}
              >
                {value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
