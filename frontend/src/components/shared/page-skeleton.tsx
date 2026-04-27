type PageSkeletonProps = {
  title: string;
  description: string;
  phase: string;
};

export function PageSkeleton({ title, description, phase }: PageSkeletonProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[var(--tp-border-subtle)] bg-[var(--tp-surface)] p-8 shadow-[var(--shadow-card)]">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[var(--tp-text-3)]">{phase}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--tp-text-1)]">{title}</h1>
        <p className="mt-3 max-w-2xl text-[var(--tp-text-2)]">{description}</p>
      </div>
    </section>
  );
}
