import * as db from "../db/client";

const STORE = "projects";

export const projectDb = {
  getAll: () => db.getAll(STORE),
  getById: (id) => db.getById(STORE, id),
  create: (data) => db.create(STORE, data),
  update: (id, data) => db.update(STORE, id, data),
  delete: (id) => db.remove(STORE, id),
  clear: () => db.clear(STORE),
};
