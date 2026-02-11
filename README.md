# Task Store

Simples React-Setup mit **Zustand** Data Stores und **IndexedDB** als persistente Client-Datenbank.

## Architektur

```
React Components → Zustand Stores → IndexedDB (db.js)
```

## Projektstruktur

```
task-store/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # Entry Point
    ├── App.jsx               # Root Component
    ├── db.js                 # Datenbank-Service (IndexedDB)
    ├── stores/
    │   ├── index.js          # Barrel Export
    │   ├── useItemStore.js   # Item CRUD Store
    │   └── useUIStore.js     # UI State (Theme, Filter)
    ├── components/
    │   ├── index.js          # Barrel Export
    │   ├── Header.jsx
    │   ├── AddItemForm.jsx
    │   ├── FilterBar.jsx
    │   ├── FilterBar.jsx
    │   ├── ItemCard.jsx
    │   └── ItemList.jsx
    └── styles/
        └── global.css        # CSS Variables & Reset
```

## Setup

```bash
npm install
npm run dev
```

## Datenbank

Die App nutzt **IndexedDB** über einen eigenen Wrapper (`src/db.js`).  
Daten bleiben auch nach dem Schließen des Browsers erhalten.

Um später ein Backend anzubinden, muss nur `db.js` gegen `fetch()`-Calls ersetzt werden — die Stores und Components bleiben unverändert.

## Stack

- **React 18** — UI
- **Zustand** — State Management
- **IndexedDB** — Persistente Client-Datenbank
- **Vite** — Build Tool
