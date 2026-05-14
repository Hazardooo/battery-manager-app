# Battery Manager

Приложение для управления устройствами и их батареями. Состоит из бэкенда на FastAPI, фронтенда на Next.js и базы данных PostgreSQL.

---

## Архитектура

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Браузер       │──────│  Next.js        │──────│  FastAPI        │
│   localhost:3000│      │  frontend:3000  │      │  backend:8000   │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                              │                           │
                              │      Docker Network       │
                              └───────────────────────────┘
                                                          │
                                                   ┌──────┴──────┐
                                                   │  PostgreSQL │
                                                   │  postgres   │
                                                   └─────────────┘
```

### Технологический стек

| Компонент | Технология | Порт |
|-----------|-----------|------|
| Frontend | Next.js 24 Alpine | 3000 |
| Backend | FastAPI + Uvicorn | 8000 |
| Database | PostgreSQL 18 Alpine | 5432 |
| Migrations | Alembic | — |
| API Client | fetch (isomorphic) | — |

---

## Быстрый старт

### Предварительные требования

- Docker + Docker Compose
- Git (опционально)

### Запуск

```bash
# 1. Клонировать репозиторий
git clone https://github.com/Hazardooo/battery-manager-app.git
cd battery-manager

# 2. Убедиться, что .env корректен
# См. раздел "Конфигурация"

# 3. Запустить все сервисы
docker compose up --build

# 4. Применить миграции (первый запуск)
docker compose --profile tools run --rm migrate

# 5. Открыть приложение
# Frontend: http://localhost:3000
# API Docs: http://localhost:8000/docs
```

### Остановка

```bash
docker compose down          # остановить
docker compose down -v       # остановить + удалить volumes
```

---

## Конфигурация

Файл `.env` в корне проекта:

```env
# Database Credentials
DB_USER=battarey_manager_admin
DB_PASSWORD=battarey_manager_pass
DB_NAME=battarey_manager
DB_PORT=5432

# FastAPI settings
APP_PORT=8000
APP_NAME="Battary Manager"

# For browser (client-side JS)
NEXT_PUBLIC_API_URL="http://localhost:8000"

# For server Next.js (inside Docker)
API_URL="http://backend:8000"

# NextJs settings
NEXTJS_PORT=3000
```

### Почему два URL для API

| Контекст | Переменная | Значение | Причина |
|----------|-----------|----------|---------|
| **Браузер** | `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Браузер на хост-машине, бэкенд проброшен на `localhost:8000` |
| **Server Component** | `API_URL` | `http://backend:8000` | Внутри Docker-сети `backend` резолвится в IP контейнера |

`NEXT_PUBLIC_` — префикс Next.js, переменные с ним встраиваются в клиентский JS на этапе сборки. `API_URL` доступна только в серверном коде Next.js.

---

## Docker Compose

### Сервисы

```yaml
services:
  postgres    # PostgreSQL 18 Alpine
  migrate     # Alembic migrations (profile: tools)
  backend     # FastAPI + Uvicorn + auto-reload
  frontend    # Next.js dev server
```

### Проброшенные порты

| Сервис | Внутри контейнера | На хосте |
|--------|-------------------|----------|
| PostgreSQL | 5432 | `${DB_PORT:-5432}` |
| FastAPI | 8000 | `${APP_PORT:-8000}` |
| Next.js | 3000 | `${NEXTJS_PORT:-3000}` |

### Volumes

| Сервис | Монтирование | Назначение |
|--------|-------------|------------|
| PostgreSQL | `postgres_data:/var/lib/postgresql/data` | Персистентность данных |
| Backend | `./backend/src:/app/src` | Hot-reload кода |
| Frontend | `./frontend:/src/app` | Hot-reload кода |

### Healthcheck

PostgreSQL проверяется через `pg_isready` каждые 10 секунд. Backend и migrate стартуют только после успешного healthcheck.

---

## API

### Базовый URL

- Локально: `http://localhost:8000`
- Внутри Docker: `http://backend:8000`

### Endpoints

| Метод | Путь | Описание | Тело запроса |
|-------|------|----------|-------------|
| `POST` | `/create` | Создать устройство | `DeviceBaseSchema` |
| `GET` | `/devices` | Получить все устройства | — |
| `GET` | `/devices/{id}` | Получить устройство по ID | — |
| `POST` | `/devices/{id}` | Обновить устройство | `DeviceBaseSchema` |
| `DELETE` | `/devices/{id}` | Удалить устройство | — |

### Схемы

#### DeviceBaseSchema
```json
{
  "device_name": "string",
  "battery_type": "string",
  "battery_count": 0
}
```

#### DeviceDataBaseSchema
```json
{
  "device_name": "string",
  "battery_type": "string",
  "battery_count": 0,
  "id": "uuid"
}
```

### OpenAPI / Swagger

Документация API автоматически генерируется FastAPI:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI JSON: `http://localhost:8000/openapi.json`

### CORS

Настроен в `main.py`:
```python
allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
]
```

---

## Frontend

### Структура API-слоя

```
frontend/src/features/devices/api/
├── client.ts        # Базовый HTTP-клиент
├── getDevices.ts    # GET /devices
├── createDevice.ts  # POST /create
├── updateDevice.ts  # POST /devices/{id}
├── deleteDevice.ts  # DELETE /devices/{id}
└── index.ts         # Barrel exports
```

### HTTP-клиент (`client.ts`)

```typescript
const API_URL = typeof window === 'undefined'
  ? (process.env.API_URL || "http://backend:8000")      // Server Component
  : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"); // Browser
```

Клиент автоматически выбирает правильный URL в зависимости от контекста выполнения:
- **Server Component** (`typeof window === 'undefined'`): использует `API_URL` для обращения к бэкенду внутри Docker-сети
- **Browser**: использует `NEXT_PUBLIC_API_URL` для обращения к проброшенному порту

### Обработка ошибок

При HTTP-ошибке клиент выбрасывает `ApiError`:
```typescript
class ApiError {
  status: number;      // HTTP статус
  code: string;        // error || "UNKNOWN"
  message: string;     // message || statusText
}
```

### Примеры использования

```typescript
import { getDevices, createDevice, updateDevice, deleteDevice } from "@/features/devices/api";

// Получить все устройства
const devices = await getDevices();

// Создать устройство
const newDevice = await createDevice({
  device_name: "Фонарик",
  battery_type: "AA",
  battery_count: 2
});

// Обновить устройство
const updated = await updateDevice(id, {
  device_name: "Фонарик Pro",
  battery_type: "AA",
  battery_count: 4
});

// Удалить устройство
await deleteDevice(id);
```

---

## Миграции базы данных

Используется Alembic для управления миграциями.

### Применить миграции

```bash
# Первый запуск или после изменений
# Миграции применяются автоматически при старте backend
# Или вручную:
docker compose --profile tools run --rm migrate
```

### Создать новую миграцию

```bash
docker compose --profile tools run --rm migrate alembic revision --autogenerate -m "описание"
```

---

## Разработка

### Hot-reload

Все сервисы настроены на hot-reload:
- **Backend**: Uvicorn с `--reload`, код монтируется из `./backend/src`
- **Frontend**: Next.js dev server, код монтируется из `./frontend`

### Логи

```bash
# Все сервисы
docker compose logs -f

# Конкретный сервис
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f postgres
```

### Подключение к БД

```bash
# Из контейнера
docker compose exec postgres psql -U battarey_manager_admin -d battarey_manager

# С хоста (если порт проброшен)
psql -h localhost -p 5432 -U battarey_manager_admin -d battarey_manager
```

---

## Распространённые проблемы

### `NetworkError when attempting to fetch resource`

**Причина**: `NEXT_PUBLIC_API_URL` указывает на `http://backend:8000`, но браузер не умеет резолвить Docker-имена.

**Решение**: Убедиться, что в `.env`:
```env
NEXT_PUBLIC_API_URL="http://localhost:8000"
API_URL="http://backend:8000"
```

И пересобрать фронтенд: `docker compose up --build frontend`

### `fetch failed` в Server Component

**Причина**: Server Component выполняется внутри контейнера `frontend`, где `localhost:8000` — это сам контейнер, а не бэкенд.

**Решение**: Добавить `API_URL="http://backend:8000"` и использовать его в `client.ts` для серверного контекста.

### CORS-ошибка

**Причина**: Домен/порт фронтенда не указан в `allow_origins` FastAPI.

**Решение**: Добавить нужный origin в `main.py`:
```python
allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
]
```

### Миграции не применились

**Причина**: Backend стартовал раньше, чем PostgreSQL стал готов.

**Решение**: Убедиться, что `depends_on` с `condition: service_healthy` работает. Или применить вручную:
```bash
docker compose --profile tools run --rm migrate
```

---

## Лицензия

[MIT](https://github.com/Hazardooo/battery-manager-app/blob/main/LICENSE)
