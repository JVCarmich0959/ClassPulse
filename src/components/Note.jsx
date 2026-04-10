export default function Note({ title = 'Note', children, tone = 'default' }) {
  return (
    <aside className={`note note-${tone}`}>
      <strong>{title}</strong>
      <p>{children}</p>
    </aside>
  );
}
