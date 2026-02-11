/**
 * db/client.js — Generischer IndexedDB Client
 *
 * Wird einmal konfiguriert und von allen Model-Repositories genutzt.
 * Neue Stores (Tables) werden in STORES registriert.
 */

const DB_NAME = "taskstore";
const DB_VERSION = 2;

/**
 * Alle Object Stores (≈ Tabellen) hier registrieren.
 * Jeder Eintrag erzeugt beim DB-Upgrade automatisch den Store + Indizes.
 */
const STORES = {
  tasks: {
    keyPath: "id",
    autoIncrement: true,
    indexes: [
      { name: "created_at", keyPath: "created_at" },
      { name: "project_id", keyPath: "project_id" },
    ],
  },
  projects: {
    keyPath: "id",
    autoIncrement: true,
    indexes: [{ name: "created_at", keyPath: "created_at" }],
  },
  invoices: {
    keyPath: "id",
    autoIncrement: true,
    indexes: [
      { name: "created_at", keyPath: "created_at" },
      { name: "project_id", keyPath: "project_id" },
      { name: "status", keyPath: "status" },
    ],
  },
};

// ============================================================
// CONNECTION
// ============================================================

let dbInstance = null;

function openDB() {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;

      for (const [name, config] of Object.entries(STORES)) {
        if (!db.objectStoreNames.contains(name)) {
          const store = db.createObjectStore(name, {
            keyPath: config.keyPath,
            autoIncrement: config.autoIncrement,
          });

          for (const idx of config.indexes || []) {
            store.createIndex(idx.name, idx.keyPath, { unique: idx.unique || false });
          }
        }
      }
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };
    request.onerror = () => reject(request.error);
  });
}

// ============================================================
// GENERIC CRUD — storeName wird von den Repositories übergeben
// ============================================================

export async function getAll(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getById(storeName, id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getByIndex(storeName, indexName, value) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const idx = tx.objectStore(storeName).index(indexName);
    const req = idx.getAll(value);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function create(storeName, data) {
  const item = { ...data, created_at: new Date().toISOString() };
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).add(item);
    req.onsuccess = () => resolve({ ...item, id: req.result });
    req.onerror = () => reject(req.error);
  });
}

export async function update(storeName, id, updates) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const getReq = store.get(id);

    getReq.onsuccess = () => {
      const updated = { ...getReq.result, ...updates, updated_at: new Date().toISOString() };
      const putReq = store.put(updated);
      putReq.onsuccess = () => resolve(updated);
      putReq.onerror = () => reject(putReq.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

export async function remove(storeName, id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).delete(id);
    req.onsuccess = () => resolve({ success: true });
    req.onerror = () => reject(req.error);
  });
}

export async function clear(storeName) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).clear();
    req.onsuccess = () => resolve({ success: true });
    req.onerror = () => reject(req.error);
  });
}
