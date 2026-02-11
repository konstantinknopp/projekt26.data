import { useItemStore } from "../stores";

export default function ItemCard({ item }) {
  const { removeItem, toggleItem } = useItemStore();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 20px",
        background: "var(--card-bg)",
        borderRadius: 14,
        marginBottom: 10,
        border: "1px solid var(--border)",
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleItem(item.id)}
        aria-label={item.done ? "Als offen markieren" : "Als erledigt markieren"}
        style={{
          width: 24,
          height: 24,
          borderRadius: 7,
          border: item.done ? "none" : "2px solid var(--border-strong)",
          background: item.done ? "var(--accent)" : "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.2s",
        }}
      >
        {item.done && <span style={{ color: "#fff", fontSize: 14 }}>✓</span>}
      </button>

      {/* Title */}
      <span
        style={{
          flex: 1,
          fontSize: 15,
          color: item.done ? "var(--text-muted)" : "var(--text)",
          textDecoration: item.done ? "line-through" : "none",
          transition: "color 0.2s",
        }}
      >
        {item.title}
      </span>

      {/* Date */}
      <span style={{ fontSize: 12, color: "var(--text-muted)", marginRight: 8 }}>
        {new Date(item.created_at).toLocaleDateString("de-DE")}
      </span>

      {/* Delete */}
      <button
        onClick={() => removeItem(item.id)}
        aria-label="Löschen"
        style={{
          background: "none",
          border: "none",
          color: "var(--text-muted)",
          cursor: "pointer",
          fontSize: 18,
          padding: "4px 8px",
          borderRadius: 6,
          transition: "color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#e55";
          e.target.style.background = "rgba(238,85,85,0.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "var(--text-muted)";
          e.target.style.background = "none";
        }}
      >
        ×
      </button>
    </div>
  );
}
