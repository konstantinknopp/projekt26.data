import { create } from "zustand";
import { invoice } from "../models";

const useInvoiceStore = create((set, get) => ({
  invoices: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const invoices = await invoice.getAll();
      set({ invoices, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  fetchByProject: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const invoices = await invoice.getByProject(projectId);
      set({ invoices, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  fetchByStatus: async (status) => {
    set({ loading: true, error: null });
    try {
      const invoices = await invoice.getByStatus(status);
      set({ invoices, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },

  add: async (data) => {
    try {
      const item = await invoice.create(data);
      set((s) => ({ invoices: [...s.invoices, item] }));
      return item;
    } catch (e) {
      set({ error: e.message });
    }
  },

  remove: async (id) => {
    try {
      await invoice.delete(id);
      set((s) => ({ invoices: s.invoices.filter((i) => i.id !== id) }));
    } catch (e) {
      set({ error: e.message });
    }
  },

  update: async (id, data) => {
    try {
      const updated = await invoice.update(id, data);
      set((s) => ({ invoices: s.invoices.map((i) => (i.id === id ? updated : i)) }));
      return updated;
    } catch (e) {
      set({ error: e.message });
    }
  },
}));

export default useInvoiceStore;
