import { useUIStore } from "../stores";

export default function Header() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
      <div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          Task Store
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: 6, fontSize: 14 }}>
          React + Zustand + IndexedDB
        </p>
      </div>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          border: "1px solid var(--border)",
          background: "var(--card-bg)",
          cursor: "pointer",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
        }}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
