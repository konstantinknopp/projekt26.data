/**
 * api/client.js — HTTP Client (fetch wrapper)
 *
 * Zentraler HTTP-Client mit Auth, Interceptors und Error-Handling.
 * Wird von den einzelnen API-Repositories importiert.
 */

const CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
};

// ============================================================
// AUTH
// ============================================================

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

export function clearAuthToken() {
  authToken = null;
}

// ============================================================
// INTERCEPTORS
// ============================================================

export const interceptors = {
  request: [],
  response: [],
};

// ============================================================
// FETCH WRAPPER
// ============================================================

export async function httpClient(endpoint, options = {}) {
  const url = `${CONFIG.baseURL}${endpoint}`;

  let config = {
    headers: { ...CONFIG.headers },
    signal: AbortSignal.timeout(CONFIG.timeout),
    ...options,
  };

  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }

  for (const fn of interceptors.request) {
    config = await fn(config);
  }

  const response = await fetch(url, config);

  for (const fn of interceptors.response) {
    await fn(response);
  }

  if (!response.ok) {
    const error = new Error(`API ${response.status}: ${response.statusText}`);
    error.status = response.status;
    try {
      error.data = await response.json();
    } catch {
      error.data = null;
    }
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
}

// Shorthand-Methoden
httpClient.get = (url) => httpClient(url, { method: "GET" });
httpClient.post = (url, body) => httpClient(url, { method: "POST", body: JSON.stringify(body) });
httpClient.patch = (url, body) => httpClient(url, { method: "PATCH", body: JSON.stringify(body) });
httpClient.put = (url, body) => httpClient(url, { method: "PUT", body: JSON.stringify(body) });
httpClient.delete = (url) => httpClient(url, { method: "DELETE" });
