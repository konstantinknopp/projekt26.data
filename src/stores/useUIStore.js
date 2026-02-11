import { create } from "zustand";

const useUIStore = create((set) => ({
  theme: "dark",
  filter: "all", // "all" | "active" | "done"

  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      return { theme: next };
    }),

  setFilter: (filter) => set({ filter }),
}));

export default useUIStore;
