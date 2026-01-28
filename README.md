# Data Migration Tool - Full Stack Setup

Ein vollständiges React-Setup mit Backend, Datenbank, State Management und Job Queue.

## 🏗️ Tech Stack

### Backend
- **Express.js** - REST API Server
- **Prisma** - ORM für Datenbank
- **SQLite** - Datenbank (kann einfach zu PostgreSQL geändert werden)
- **BullMQ** - Job Queue für asynchrone Migrations
- **Redis** - Message Broker für BullMQ

### Frontend
- **React 18** - UI Framework
- **Vite** - Build Tool
- **TypeScript** - Type Safety
- **TanStack Query (React Query)** - Server State Management
- **Zustand** - Client State Management
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client

## 📁 Projekt-Struktur

```
data-migration-app/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Datenbankschema
│   ├── src/
│   │   ├── routes/
│   │   │   ├── users.ts           # User API
│   │   │   ├── connections.ts     # Connections API
│   │   │   └── migrations.ts      # Migrations API
│   │   ├── server.ts              # Express Server
│   │   └── queue.ts               # BullMQ Job Processing
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── api.ts             # Axios Client
│   │   │   └── hooks.ts           # React Query Hooks
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── MigrationPage.tsx
│   │   │   └── ConnectionsPage.tsx
│   │   ├── store/
│   │   │   └── migrationStore.ts  # Zustand Store
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## 🚀 Installation & Setup

### 1. Redis installieren (für Job Queue)

**macOS:**
```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**
```bash
sudo apt-get install redis-server
sudo systemctl start redis
```

**Windows:**
- Download von https://github.com/microsoftarchive/redis/releases
- Oder nutze WSL/Docker

**Docker (alle Plattformen):**
```bash
docker run -d -p 6379:6379 redis:alpine
```

### 2. Backend Setup

```bash
cd backend

# Dependencies installieren
npm install

# Environment Variables erstellen
cp .env.example .env

# Datenbank initialisieren
npx prisma generate
npx prisma db push

# Server starten
npm run dev
```

Backend läuft auf: `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Frontend läuft auf: `http://localhost:5173`

## 📊 Datenbank Schema

### User
- id, email, name, company
- Relationen zu Connections & Migrations

### Connection
- id, name, type, config (JSON)
- Verschiedene Typen: database, excel, csv, api

### Migration
- id, name, status, mappings, transformations
- Verknüpft Source & Target Connections
- Tracking: recordsTotal, recordsProcessed, jobId

## 🔄 State Management Konzepte

### 1. **Zustand** (Client State)

Für UI-spezifische States wie Form-Daten, Mappings, temporäre Auswahlen:

```typescript
const useMigrationStore = create((set) => ({
  mappings: [],
  addMapping: (mapping) => set((state) => ({
    mappings: [...state.mappings, mapping]
  }))
}))

// Verwendung
function Component() {
  const mappings = useMigrationStore(state => state.mappings)
  const addMapping = useMigrationStore(state => state.addMapping)
}
```

### 2. **React Query** (Server State)

Für alle Daten vom Backend - automatisches Caching, Background Updates:

```typescript
// Daten fetchen
const { data, isLoading } = useMigrations()

// Mutation (Create/Update/Delete)
const createMigration = useCreateMigration()
await createMigration.mutateAsync({ name: 'My Migration' })
```

## 🎯 Job Queue System (BullMQ)

### Wie es funktioniert:

1. **Migration erstellen**: POST `/api/migrations`
2. **Migration starten**: POST `/api/migrations/:id/start`
   - Erstellt BullMQ Job
   - Job wird in Queue eingereiht
3. **Worker verarbeitet Job**:
   - Lädt Source-Daten
   - Transformiert nach Mappings
   - Schreibt zu Target
   - Updated Progress in DB
4. **Frontend pollt Status**: Auto-Refresh alle 2-5 Sekunden

### Queue Monitoring:

```typescript
// Queue Statistiken abrufen
const { data } = useQueueStats()
// { waiting: 2, active: 1, completed: 45, failed: 3 }

// Job Progress abrufen
const { data } = useMigrationStats(migrationId)
// { progress: 67, recordsProcessed: 6700, recordsTotal: 10000 }
```

## 🔌 API Endpoints

### Users
- `GET /api/users` - Alle Users
- `GET /api/users/:id` - User by ID
- `POST /api/users` - User erstellen
- `PUT /api/users/:id` - User updaten

### Connections
- `GET /api/connections?userId=1` - Connections eines Users
- `POST /api/connections` - Connection erstellen
- `PUT /api/connections/:id` - Connection updaten
- `DELETE /api/connections/:id` - Connection löschen
- `POST /api/connections/:id/test` - Connection testen

### Migrations
- `GET /api/migrations?userId=1` - Migrations eines Users
- `GET /api/migrations/:id` - Migration Details + Job Status
- `POST /api/migrations` - Migration erstellen
- `POST /api/migrations/:id/start` - Migration starten (in Queue)
- `POST /api/migrations/:id/cancel` - Migration abbrechen
- `GET /api/migrations/:id/stats` - Progress & Statistiken
- `GET /api/migrations/queue/stats` - Queue Status

## 🎨 Features

### Implementiert:
- ✅ User Management
- ✅ Connection Management (CRUD)
- ✅ Migration Configuration mit Field Mapping
- ✅ Job Queue System mit BullMQ
- ✅ Live Progress Tracking
- ✅ Dashboard mit Statistiken
- ✅ Zustand für lokalen State
- ✅ React Query für Server State
- ✅ TypeScript End-to-End

### TODO (Erweiterungen):
- [ ] Authentifizierung (JWT/Session)
- [ ] Tatsächliche DB-Verbindungen (MySQL, PostgreSQL, MongoDB)
- [ ] Excel/CSV File Processing
- [ ] Data Transformations Engine
- [ ] Error Recovery & Retry Logic
- [ ] Scheduled Migrations (Cron)
- [ ] Export/Import von Konfigurationen
- [ ] Real-time Updates (WebSockets)

## 🧪 Testing

### Backend testen:

```bash
# Server muss laufen
curl http://localhost:3001/health

# User erstellen
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### Frontend testen:

1. Dashboard öffnen: `http://localhost:5173/dashboard`
2. Connection erstellen: `http://localhost:5173/connections`
3. Migration konfigurieren: `http://localhost:5173/migration`

## 🔧 Troubleshooting

**Problem: "Redis connection refused"**
```bash
# Prüfe ob Redis läuft
redis-cli ping
# Sollte "PONG" zurückgeben

# Falls nicht, starte Redis
brew services start redis  # macOS
sudo systemctl start redis # Linux
```

**Problem: "Port already in use"**
```bash
# Backend Port ändern in backend/.env
PORT=3002

# Frontend Port ändern in frontend/vite.config.ts
server: { port: 5174 }
```

**Problem: "Prisma Client not generated"**
```bash
cd backend
npx prisma generate
```

## 📚 Weiterführende Ressourcen

- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Prisma Docs](https://www.prisma.io/docs)
- [BullMQ Docs](https://docs.bullmq.io/)
- [Vite Docs](https://vitejs.dev/)

## 🤝 Development Workflow

1. Backend starten: `cd backend && npm run dev`
2. Redis starten: `redis-server` (in separatem Terminal)
3. Frontend starten: `cd frontend && npm run dev`
4. Prisma Studio öffnen (optional): `cd backend && npx prisma studio`

Happy Coding! 🚀
