import * as db from "../db/client";

const STORE = "invoices";

export const invoiceDb = {
  getAll: () => db.getAll(STORE),
  getById: (id) => db.getById(STORE, id),
  getByProject: (projectId) => db.getByIndex(STORE, "project_id", projectId),
  getByStatus: (status) => db.getByIndex(STORE, "status", status),
  create: (data) => db.create(STORE, data),
  update: (id, data) => db.update(STORE, id, data),
  delete: (id) => db.remove(STORE, id),
  clear: () => db.clear(STORE),
};
