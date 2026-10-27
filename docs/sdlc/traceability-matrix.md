# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Log in with email and password | US-001 | 1 | POST /auth/login, backend, cognito, frontend, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Restrict access to authenticated staff only | US-002 | 2 | POST /auth/logout, backend, cognito, users | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-003 | EPIC-001 | Query any document without per-document restrictions | US-003 | 3 | POST /conversations/{id}/messages, backend, chunks, documents | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-004 | EPIC-002 | Build the document index from the S3 bucket | US-004, US-004-T1, US-004-T2, US-004-T3, US-004-T4 | 1 | POST /admin/index/runs, bedrock, chunks, db, documents, indexing_runs, s3, search, worker | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-005 | EPIC-002 | Extract text from document files | US-005 | 2 | chunks, documents, indexing_runs, s3, worker | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-006 | EPIC-002 | Extract text and metadata from structured files | US-006 | 2 | chunks, documents, indexing_runs, s3, worker | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-002 | Monitor indexing status | US-007 | 3 | GET /admin/index/status, backend, db, indexing_runs, worker | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-008 | EPIC-003 | Hybrid retrieval over the document index | US-008, US-008-T1, US-008-T2, US-008-T3 | 3 | POST /conversations/{id}/messages, backend, bedrock, chunks, db, documents, search | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-009 | EPIC-003 | Generate answers grounded in retrieved chunks | US-009 | 3 | POST /conversations/{id}/messages, backend, bedrock, chunks, messages | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-003 | Show source citations with each answer | US-010 | 4 | POST /conversations/{id}/messages, backend, citations, db, frontend, messages | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-004 | Ask questions in a chat interface | US-011, US-011-T1, US-011-T2, US-011-T3, US-011-T4 | 4 | POST /conversations, POST /conversations/{id}/messages, backend, bedrock, conversations, frontend, messages, redis | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-012 | EPIC-004 | Multi-turn follow-up context | US-012 | 5 | POST /conversations/{id}/messages, backend, conversations, db, messages, redis | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-013 | EPIC-004 | View conversation history | US-013 | 5 | GET /conversations, GET /conversations/{id}/messages, backend, citations, conversations, db, frontend, messages | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
<!-- sdlc:auto:end matrix -->
