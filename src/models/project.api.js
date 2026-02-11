import { httpClient } from "../api/client";

const BASE = "/projects";

export const projectApi = {
  getAll: () => httpClient.get(BASE),
  getById: (id) => httpClient.get(`${BASE}/${id}`),
  create: (data) => httpClient.post(BASE, data),
  update: (id, data) => httpClient.patch(`${BASE}/${id}`, data),
  delete: (id) => httpClient.delete(`${BASE}/${id}`),
  clear: () => httpClient.delete(BASE),
};
