import { useState } from "react";
import { useItemStore } from "../stores";

export default function AddItemForm() {
  const [title, setTitle] = useState("");
  const addItem = useItemStore((s) => s.addItem);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addItem({ title: title.trim(), done: false });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Neues Item hinzufügen…"
        className="flex-1 rounded-xl border border-border bg-input px-4.5 py-3.5 text-[15px] text-text outline-none transition-colors placeholder:text-muted focus:border-accent"
      />
      <button
        type="submit"
        className="rounded-xl bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
      >
        Hinzufügen
      </button>
    </form>
  );
}
