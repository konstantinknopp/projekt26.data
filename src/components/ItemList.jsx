import { useTaskStore, useUIStore } from "../stores";
import ItemCard from "./ItemCard";

export default function ItemList() {
  const { tasks, loading } = useTaskStore();
  const filter = useUIStore((s) => s.filter);

  const filtered = tasks.filter((item) => {
    if (filter === "active") return !item.done;
    if (filter === "done") return item.done;
    return true;
  });

  if (loading) {
    return <p className="py-10 text-center text-muted">Laden…</p>;
  }

  if (filtered.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted">
        {filter === "all"
          ? "Noch keine Items. Füge eins oben hinzu!"
          : `Keine ${filter === "active" ? "offenen" : "erledigten"} Items.`}
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
