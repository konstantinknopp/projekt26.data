import { create } from "zustand";
import { project } from "../models";

const useProjectStore = create((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const projects = await project.getAll();
      set({ projects, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  add: async (data) => {
    try {
      const item = await project.create(data);
      set((s) => ({ projects: [...s.projects, item] }));
      return item;
    } catch (e) {
      set({ error: e.message });
    }
  },

  remove: async (id) => {
    try {
      await project.delete(id);
      set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  update: async (id, data) => {
    try {
      const updated = await project.update(id, data);
      set((s) => ({ projects: s.projects.map((p) => (p.id === id ? updated : p)) }));
      return updated;
    } catch (e) {
      set({ error: e.message });
    }
  },
}));

export default useProjectStore;
