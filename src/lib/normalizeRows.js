export function normalizeRows(rows = []) {
  return rows.map((row) => ({ ...row }));
}
