import { useUIStore, useItemStore } from "../stores";

const FILTERS = [
  { key: "all", label: "Alle" },
  { key: "active", label: "Offen" },
  { key: "done", label: "Erledigt" },
];

export default function FilterBar() {
  const { filter, setFilter } = useUIStore();
  const activeCount = useItemStore((s) => s.items.filter((i) => !i.done).length);

  return (
    <div className="mb-5 flex items-center gap-2">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          className={`cursor-pointer rounded-lg px-4 py-2 text-[13px] font-medium transition-all ${
            filter === f.key
              ? "bg-accent text-white"
              : "bg-card text-muted hover:text-text"
          }`}
        >
          {f.label}
        </button>
      ))}
      <span className="ml-auto text-[13px] text-muted">
        {activeCount} offen
      </span>
    </div>
  );
}
