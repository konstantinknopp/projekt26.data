import { httpClient } from "../api/client";

const BASE = "/invoices";

export const invoiceApi = {
  getAll: () => httpClient.get(BASE),
  getById: (id) => httpClient.get(`${BASE}/${id}`),
  getByProject: (projectId) => httpClient.get(`${BASE}?project_id=${projectId}`),
  getByStatus: (status) => httpClient.get(`${BASE}?status=${status}`),
  create: (data) => httpClient.post(BASE, data),
  update: (id, data) => httpClient.patch(`${BASE}/${id}`, data),
  delete: (id) => httpClient.delete(`${BASE}/${id}`),
  clear: () => httpClient.delete(BASE),
};
