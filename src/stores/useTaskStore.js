import { create } from "zustand";
import { task } from "../models";

const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await task.getAll();
      set({ tasks, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  fetchByProject: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const tasks = await task.getByProject(projectId);
      set({ tasks, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  add: async (data) => {
    try {
      const item = await task.create(data);
      set((s) => ({ tasks: [...s.tasks, item] }));
      return item;
    } catch (e) {
      set({ error: e.message });
    }
  },

  remove: async (id) => {
    try {
      await task.delete(id);
      set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  toggle: async (id) => {
    const item = get().tasks.find((t) => t.id === id);
    if (!item) return;
    try {
      const updated = await task.update(id, { done: !item.done });
      set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? updated : t)) }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  update: async (id, data) => {
    try {
      const updated = await task.update(id, data);
      set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? updated : t)) }));
      return updated;
    } catch (e) {
      set({ error: e.message });
    }
  },
}));

export default useTaskStore;
