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
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, marginBottom: 32 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Neues Item hinzufügen…"
        style={{
          flex: 1,
          padding: "14px 18px",
          border: "1px solid var(--border)",
          borderRadius: 12,
          background: "var(--input-bg)",
          color: "var(--text)",
          fontSize: 15,
          outline: "none",
          transition: "border-color 0.2s",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "14px 28px",
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 15,
          cursor: "pointer",
          transition: "opacity 0.2s",
        }}
      >
        Hinzufügen
      </button>
    </form>
  );
}
