# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `68f79ae` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated scaffold for a Hybrid Retrieval Augmented Generation chatbot, built as two separate apps in one repo: a Vite + React 19 SPA (frontend/) whose screens were approved against a design and currently render seeded sample data, and a FastAPI 0.115 service (backend/) that only exposes a /health endpoint so far, since no backend architecture had been approved when it was generated. The backend uses SQLAlchemy with a SQLite database by default (switchable via DATABASE_URL, e.g. to the PostgreSQL 16 named in the approved stack), and docker-compose.yml provisions Postgres, Meilisearch and Redis containers for the hybrid retrieval architecture once it's built out.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js with npm (for the frontend, Vite 6 / React 19)
- Python 3.12 (matches backend/Dockerfile) with pip
- Docker and Docker Compose (optional, for Postgres/Meilisearch/Redis via docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. git clone the repository and cd into it
2. cp .env.example .env and fill in any required values
3. cd backend && pip install -r requirements.txt
4. uvicorn app.main:app --reload   # starts the FastAPI service on http://127.0.0.1:8000
5. In a new terminal: cd frontend && npm install
6. npm run dev   # starts the Vite dev server
7. (optional) from the repo root: docker-compose up   # starts Postgres, Meilisearch and Redis for the approved architecture
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the React SPA (run inside frontend/). |
| frontend build | `npm run build` | Bundles the app with Vite (does not typecheck). |
| frontend preview | `npm run preview` | Serves the production build locally. |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI app with autoreload (run inside backend/). |
| docker compose | `docker-compose up` | Starts Postgres, Meilisearch and Redis containers defined in docker-compose.yml. |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend/app` | FastAPI application: main.py (entrypoint, CORS, /health), database.py (engine/session), models.py (SQLAlchemy models, currently empty), schemas.py (Pydantic schemas incl. StubResponse), services.py, routers/ (one router per architecture component, currently empty) |
| `backend/tests` | Pytest test suite (test_health.py) for the backend |
| `frontend/src` | React SPA source: lib/ (api client, UI/icon vocabulary, navigation helpers), main.tsx entrypoint, index.css, test-setup.ts for Vitest |
| `frontend/e2e` | Playwright end-to-end specs run against the built/served app or a deployed URL via E2E_BASE_URL |
| `.quorq` | Platform metadata (handoff.json) from the Quorq AI SDLC platform that generated this repo |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routers are organized one per approved architecture component, with one route per declared endpoint (currently none beyond /health)
- Unimplemented backend routes return a typed StubResponse (status: not_implemented) rather than erroring, keeping the OpenAPI schema complete
- SQLAlchemy models all inherit from the shared Base in app/database.py; main.py imports models before calling Base.metadata.create_all
- Database access uses a request-scoped session via the get_db dependency; DATABASE_URL env var switches from the SQLite default to a real database
- CORS allowed origins are configured via the ALLOWED_ORIGINS env var (comma-separated), falling back to the local Vite dev server origins
- Frontend API access is centralized in src/lib/api.ts (apiFetch helper), using VITE_API_BASE_URL and VITE_API_SECRET_KEY env vars; screens currently render seeded data and have not been wired to it yet
- Frontend component tests live beside the components they cover and are picked up by Vitest's src/**/*.{test,spec}.{ts,tsx} pattern; Playwright specs live separately in e2e/
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend tests | `pytest` | Runs the backend test suite (run inside backend/; pytest.ini sets pythonpath). |
| backend lint | `ruff check .` | Lints the backend code. |
| backend format | `ruff format .` | Formats the backend code. |
| frontend unit tests | `npm run test` | Runs Vitest component tests (run inside frontend/). |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app; this gates development. |
| frontend format check | `npm run format:check` | Checks formatting with Prettier. |
| frontend typecheck | `npm run typecheck` | Runs tsc --noEmit (not run by build). |
| e2e tests | `npm run test:e2e` | Runs Playwright specs from e2e/; builds/serves the backend and frontend locally unless E2E_BASE_URL is set. |
| e2e browser install | `npm run test:e2e:install` | Installs the Chromium browser Playwright needs. |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| docker-compose up fails or two services won't start | Both the 'redis-queue' and 'redis' services in docker-compose.yml map container port 6379 to host port 6379, which conflicts. Only one can bind that host port at a time; adjust the host port mapping for one of them before running both. |
| Frontend calls to the backend are blocked by the browser (CORS errors) | Set the ALLOWED_ORIGINS env var on the backend to include the frontend's origin (e.g. http://localhost:5173 for the default Vite dev server). |
| `pytest` fails with ModuleNotFoundError: No module named 'app' | Run pytest from inside backend/ so pytest.ini's pythonpath = . setting is applied. |
| Playwright e2e tests fail to launch a browser | Run `npm run test:e2e:install` first to fetch Chromium. |
| `npm run build` succeeds but deployment/typecheck fails | Run `npm run typecheck` (tsc --noEmit) separately, since build does not typecheck the generated screens. |
<!-- sdlc:auto:end troubleshooting -->
