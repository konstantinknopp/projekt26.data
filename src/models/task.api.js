import { httpClient } from "../api/client";

const BASE = "/tasks";

export const taskApi = {
  getAll: () => httpClient.get(BASE),
  getById: (id) => httpClient.get(`${BASE}/${id}`),
  getByProject: (projectId) => httpClient.get(`${BASE}?project_id=${projectId}`),
  create: (data) => httpClient.post(BASE, data),
  update: (id, data) => httpClient.patch(`${BASE}/${id}`, data),
  delete: (id) => httpClient.delete(`${BASE}/${id}`),
  clear: () => httpClient.delete(BASE),
};
