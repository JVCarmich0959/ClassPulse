export default function TabNav({ tabs, active, onChange }) {
  return (
    <nav className="tabNav" aria-label="Admin dashboard sections">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={active === tab ? 'active' : ''}
          onClick={() => onChange(tab)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
