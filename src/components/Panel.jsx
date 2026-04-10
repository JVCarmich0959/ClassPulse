export default function Panel({ title, subtitle, children, actions }) {
  return (
    <section className="panel">
      {(title || subtitle || actions) && (
        <header className="panelHeader">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
