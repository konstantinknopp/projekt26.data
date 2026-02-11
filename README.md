# Task Store

React-Setup mit **Zustand** Stores, **Multi-Model**-Architektur und umschaltbarer Datenquelle (IndexedDB / REST API).

## Architektur

```
Components → Zustand Stores → Models → db/client.js  (IndexedDB)
                                      → api/client.js (REST API)
```

Jedes Model (Task, Project, Invoice) hat zwei Repository-Dateien mit identischem Interface.
Der aktive Backend-Typ wird zentral in `models/index.js` per Env-Variable umgeschaltet.

## Projektstruktur

```
src/
├── main.jsx
├── App.jsx
│
├── api/                        # HTTP Layer
│   ├── client.js               #   fetch wrapper, auth, interceptors
│   └── index.js
│
├── db/                         # Database Layer
│   ├── client.js               #   generischer IndexedDB client
│   └── index.js
│
├── models/                     # Repositories (pro Model: .db + .api)
│   ├── index.js                #   ← Switch db/api, barrel export
│   ├── task.db.js
│   ├── task.api.js
│   ├── project.db.js
│   ├── project.api.js
│   ├── invoice.db.js
│   └── invoice.api.js
│
├── stores/                     # Zustand Stores (pro Model)
│   ├── index.js
│   ├── useTaskStore.js
│   ├── useProjectStore.js
│   ├── useInvoiceStore.js
│   └── useUIStore.js
│
├── components/                 # React Components
│   ├── index.js
│   ├── Header.jsx
│   ├── AddItemForm.jsx
│   ├── FilterBar.jsx
│   ├── ItemCard.jsx
│   └── ItemList.jsx
│
└── styles/
    └── global.css              # Tailwind v4 + Theme tokens
```

## Neues Model hinzufügen

1. IndexedDB Store in `db/client.js` → `STORES` registrieren
2. `models/example.db.js` + `models/example.api.js` erstellen
3. In `models/index.js` exportieren
4. `stores/useExampleStore.js` erstellen
5. Components bauen

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

## Datenquelle umschalten

```bash
# .env
VITE_USE_API=false               # IndexedDB (default)
VITE_USE_API=true                # REST API
VITE_API_URL=http://localhost:3001/api
```

## Stack

- React 18 — UI
- Zustand — State Management
- Tailwind CSS v4 — Styling
- IndexedDB — Offline-Datenbank
- Vite — Build Tool
