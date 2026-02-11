import { useTaskStore } from "../stores";

export default function ItemCard({ item }) {
  const { remove, toggle } = useTaskStore();

  return (
    <div className="mb-2.5 flex items-center gap-3.5 rounded-[14px] border border-border bg-card px-5 py-4 transition-transform hover:scale-[1.01]">
      <button
        onClick={() => toggle(item.id)}
        aria-label={item.done ? "Als offen markieren" : "Als erledigt markieren"}
        className={`flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[7px] transition-all ${
          item.done
            ? "border-none bg-accent"
            : "border-2 border-border-strong bg-transparent"
        }`}
      >
        {item.done && <span className="text-sm text-white">✓</span>}
      </button>

      <span
        className={`flex-1 text-[15px] transition-colors ${
          item.done ? "text-muted line-through" : "text-text"
        }`}
      >
        {item.title}
      </span>

      <span className="mr-2 text-xs text-muted">
        {new Date(item.created_at).toLocaleDateString("de-DE")}
      </span>

      <button
        onClick={() => remove(item.id)}
        aria-label="Löschen"
        className="cursor-pointer rounded-md px-2 py-1 text-lg text-muted transition-colors hover:bg-danger/10 hover:text-danger"
      >
        ×
      </button>
    </div>
  );
}
