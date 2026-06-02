import { useMemo } from "react";

export type FilterOption = { label: string; value: string };

export type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
};

export function InventoryFilters({
  groups,
  values,
  onChange,
  query,
  onQueryChange,
  resultCount,
  totalCount,
}: {
  groups: FilterGroup[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
  resultCount: number;
  totalCount: number;
}) {
  const hasActive = useMemo(
    () => query.trim().length > 0 || Object.values(values).some((v) => v && v !== "all"),
    [query, values],
  );

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 md:p-7 backdrop-blur">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-8">
        <div className="flex-1">
          <label className="eyebrow block" htmlFor="inv-search">Search</label>
          <input
            id="inv-search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Name, model, spec…"
            className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm text-ink placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        {groups.map((g) => (
          <div key={g.id} className="md:min-w-[180px]">
            <label className="eyebrow block" htmlFor={`flt-${g.id}`}>{g.label}</label>
            <select
              id={`flt-${g.id}`}
              value={values[g.id] ?? "all"}
              onChange={(e) => onChange(g.id, e.target.value)}
              className="mt-2 w-full appearance-none rounded-full border border-border bg-background px-5 py-3 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            >
              {g.options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {resultCount} of {totalCount} shown
        </p>
        {hasActive && (
          <button
            type="button"
            onClick={() => {
              onQueryChange("");
              groups.forEach((g) => onChange(g.id, "all"));
            }}
            className="text-xs uppercase tracking-[0.22em] text-accent hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}