import { create } from "zustand";
import { db } from "../db";

const useItemStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchItems: async () => {
    set({ loading: true, error: null });
    try {
      const items = await db.getAll();
      set({ items, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  addItem: async (data) => {
    try {
      const item = await db.create(data);
      set((s) => ({ items: [...s.items, item] }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  removeItem: async (id) => {
    try {
      await db.delete(id);
      set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  toggleItem: async (id) => {
    const item = get().items.find((i) => i.id === id);
    if (!item) return;
    try {
      const updated = await db.update(id, { done: !item.done });
      set((s) => ({ items: s.items.map((i) => (i.id === id ? updated : i)) }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  clearAll: async () => {
    try {
      await db.clear();
      set({ items: [] });
    } catch (e) {
      set({ error: e.message });
    }
  },
}));

export default useItemStore;
