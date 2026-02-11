import { useUIStore } from "../stores";

export default function Header() {
  const { theme, toggleTheme } = useUIStore();

  return (
    <header className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Task Store
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          React + Zustand + IndexedDB
        </p>
      </div>
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="flex size-11 items-center justify-center rounded-xl border border-border bg-card text-xl transition-colors hover:border-border-strong cursor-pointer"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
