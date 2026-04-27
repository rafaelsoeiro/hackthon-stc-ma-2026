import type { DataRow } from '@/src/features/analytics/types';

type DataTableProps = {
  title: string;
  columns: { key: string; label: string }[];
  rows: DataRow[];
};

export function DataTable({ title, columns, rows }: DataTableProps) {
  return (
    <section className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-5">
      <h2 className="mb-4 text-lg font-semibold text-[var(--tp-text-1)]">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="border-b border-[var(--tp-border-subtle)] px-3 py-2 text-left text-xs uppercase tracking-wide text-[var(--tp-text-3)]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${String(row[columns[0].key])}-${index}`}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="border-b border-[var(--tp-border-subtle)] px-3 py-3 text-sm text-[var(--tp-text-2)]"
                  >
                    {String(row[column.key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
