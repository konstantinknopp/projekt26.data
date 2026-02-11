import { useItemStore, useUIStore } from "../stores";
import ItemCard from "./ItemCard";

export default function ItemList() {
  const { items, loading } = useItemStore();
  const filter = useUIStore((s) => s.filter);

  const filtered = items.filter((item) => {
    if (filter === "active") return !item.done;
    if (filter === "done") return item.done;
    return true;
  });

  if (loading) {
    return <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 40 }}>Laden…</p>;
  }

  if (filtered.length === 0) {
    return (
      <p style={{ color: "var(--text-muted)", textAlign: "center", padding: 40, fontSize: 14 }}>
        {filter === "all" ? "Noch keine Items. Füge eins oben hinzu!" : `Keine ${filter === "active" ? "offenen" : "erledigten"} Items.`}
      </p>
    );
  }

  return (
    <div>
      {filtered.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
