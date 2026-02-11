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
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: filter === f.key ? "var(--accent)" : "var(--card-bg)",
            color: filter === f.key ? "#fff" : "var(--text-muted)",
            fontWeight: 500,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {f.label}
        </button>
      ))}
      <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--text-muted)" }}>
        {activeCount} offen
      </span>
    </div>
  );
}
