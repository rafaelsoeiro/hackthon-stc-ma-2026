import type { DatasetEntry } from '@/src/features/discovery/types';

type TechnicalCatalogPanelProps = {
  items: DatasetEntry[];
};

export function TechnicalCatalogPanel({ items }: TechnicalCatalogPanelProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-6">
        <p className="text-xs uppercase tracking-wide text-[var(--tp-text-3)]">Explorar dados</p>
        <h1 className="mt-2 text-3xl font-semibold text-[var(--tp-text-1)]">Catalogo tecnico</h1>
        <p className="mt-2 text-sm text-[var(--tp-text-2)]">
          Inventario de bases com cadencia de atualizacao e formato de disponibilizacao.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-4">
        <table className="w-full min-w-[620px]">
          <thead>
            <tr>
              {['Base', 'Dominio', 'Cadencia', 'Formato', 'Status'].map((col) => (
                <th key={col} className="border-b border-[var(--tp-border-subtle)] px-3 py-2 text-left text-xs text-[var(--tp-text-3)]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name}>
                <td className="border-b border-[var(--tp-border-subtle)] px-3 py-3 text-sm text-[var(--tp-text-1)]">{item.name}</td>
                <td className="border-b border-[var(--tp-border-subtle)] px-3 py-3 text-sm text-[var(--tp-text-2)]">{item.domain}</td>
                <td className="border-b border-[var(--tp-border-subtle)] px-3 py-3 text-sm text-[var(--tp-text-2)]">{item.cadence}</td>
                <td className="border-b border-[var(--tp-border-subtle)] px-3 py-3 text-sm text-[var(--tp-text-2)]">{item.format}</td>
                <td className="border-b border-[var(--tp-border-subtle)] px-3 py-3 text-sm text-[var(--tp-text-2)]">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
