import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface User {
  id: number;
  email: string;
  name: string;
  company?: string;
  createdAt: string;
}

export interface Connection {
  id: number;
  name: string;
  type: string;
  config: string;
  userId: number;
  lastUsed?: string;
  createdAt: string;
}

export interface Migration {
  id: number;
  name: string;
  status: string;
  sourceId: number;
  targetId: number;
  mappings: string;
  transformations?: string;
  recordsTotal: number;
  recordsProcessed: number;
  errorLog?: string;
  userId: number;
  jobId?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  source?: Connection;
  target?: Connection;
  user?: User;
}

// API functions
export const userApi = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: number) => api.get<User>(`/users/${id}`),
  create: (data: Partial<User>) => api.post<User>('/users', data),
  update: (id: number, data: Partial<User>) => api.put<User>(`/users/${id}`, data),
};

export const connectionApi = {
  getAll: (userId?: number) =>
    api.get<Connection[]>('/connections', { params: { userId } }),
  getById: (id: number) => api.get<Connection>(`/connections/${id}`),
  create: (data: Partial<Connection>) => api.post<Connection>('/connections', data),
  update: (id: number, data: Partial<Connection>) =>
    api.put<Connection>(`/connections/${id}`, data),
  delete: (id: number) => api.delete(`/connections/${id}`),
  test: (id: number) => api.post(`/connections/${id}/test`),
};

export const migrationApi = {
  getAll: (userId?: number) =>
    api.get<Migration[]>('/migrations', { params: { userId } }),
  getById: (id: number) => api.get<Migration>(`/migrations/${id}`),
  create: (data: Partial<Migration>) => api.post<Migration>('/migrations', data),
  start: (id: number) => api.post(`/migrations/${id}/start`),
  cancel: (id: number) => api.post(`/migrations/${id}/cancel`),
  getStats: (id: number) => api.get(`/migrations/${id}/stats`),
  getQueueStats: () => api.get('/migrations/queue/stats'),
};
