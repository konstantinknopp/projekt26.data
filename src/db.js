/**
 * db.js — Lightweight IndexedDB wrapper
 *
 * Provides a persistent client-side database with a simple async CRUD API.
 * Uses IndexedDB under the hood — data survives page reloads and browser restarts.
 *
 * Replace this module with fetch() calls to a REST API if you add a backend later.
 */

const DB_NAME = "taskstore";
const DB_VERSION = 1;
const STORE_NAME = "items";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        store.createIndex("created_at", "created_at", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function withStore(mode, callback) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, mode);
        const store = tx.objectStore(STORE_NAME);
        const result = callback(store);

        tx.oncomplete = () => resolve(result._value ?? result);
        tx.onerror = () => reject(tx.error);

        // For IDBRequest-based operations, capture the result
        if (result instanceof IDBRequest) {
          result.onsuccess = () => {
            result._value = result.result;
          };
        }
      })
  );
}

export const db = {
  async getAll() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async getById(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async create(data) {
    const item = { ...data, created_at: new Date().toISOString() };
    const dbConn = await openDB();
    return new Promise((resolve, reject) => {
      const tx = dbConn.transaction(STORE_NAME, "readwrite");
      const request = tx.objectStore(STORE_NAME).add(item);
      request.onsuccess = () => resolve({ ...item, id: request.result });
      request.onerror = () => reject(request.error);
    });
  },

  async update(id, updates) {
    const dbConn = await openDB();
    return new Promise((resolve, reject) => {
      const tx = dbConn.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(id);

      getReq.onsuccess = () => {
        const updated = { ...getReq.result, ...updates };
        const putReq = store.put(updated);
        putReq.onsuccess = () => resolve(updated);
        putReq.onerror = () => reject(putReq.error);
      };
      getReq.onerror = () => reject(getReq.error);
    });
  },

  async delete(id) {
    const dbConn = await openDB();
    return new Promise((resolve, reject) => {
      const tx = dbConn.transaction(STORE_NAME, "readwrite");
      const request = tx.objectStore(STORE_NAME).delete(id);
      request.onsuccess = () => resolve({ success: true });
      request.onerror = () => reject(request.error);
    });
  },

  async clear() {
    const dbConn = await openDB();
    return new Promise((resolve, reject) => {
      const tx = dbConn.transaction(STORE_NAME, "readwrite");
      const request = tx.objectStore(STORE_NAME).clear();
      request.onsuccess = () => resolve({ success: true });
      request.onerror = () => reject(request.error);
    });
  },
};
