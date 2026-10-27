# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up staff login and build the initial S3-to-index pipeline (chunking, embedding, hybrid index population).

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Log in with email and password | 5 | security-agent | — |
| US-004 | Story | Build the document index from the S3 bucket | 13 | backend-agent | — |
| ↳ US-004-T1 | Task | Implement S3 bucket listing and file retrieval | — | backend-agent | — |
| ↳ US-004-T2 | Task | Implement chunking and Bedrock embedding pipeline | — | backend-agent | — |
| ↳ US-004-T3 | Task | Populate pgvector and Meilisearch indexes from processed chunks | — | backend-agent | — |
| ↳ US-004-T4 | Task | Implement indexing_runs status tracking and persistence | — | backend-agent | — |

## Sprint 2: Sprint 2

Enforce authenticated-only access end to end and extract text/metadata from all supported file types.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-002 | Story | Restrict access to authenticated staff only | 5 | security-agent | US-001 |
| US-005 | Story | Extract text from document files | 8 | backend-agent | US-004 |
| US-006 | Story | Extract text and metadata from structured files | 5 | backend-agent | US-004 |

## Sprint 3: Sprint 3

Expose indexing status, implement hybrid keyword+semantic retrieval, and generate Bedrock-grounded answers.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-003 | Story | Query any document without per-document restrictions | 2 | qa-agent | US-002, US-008 |
| US-007 | Story | Monitor indexing status | 5 | backend-agent | US-004 |
| US-008 | Story | Hybrid retrieval over the document index | 8 | backend-agent | US-004 |
| ↳ US-008-T1 | Task | Implement keyword search query against Meilisearch | — | backend-agent | — |
| ↳ US-008-T2 | Task | Implement semantic vector search against pgvector using Titan embeddings | — | backend-agent | — |
| ↳ US-008-T3 | Task | Implement result merging and relevance ranking | — | backend-agent | — |
| US-009 | Story | Generate answers grounded in retrieved chunks | 5 | backend-agent | US-008 |

## Sprint 4: Sprint 4

Add source citations and ship the streaming chat interface staff interact with.

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-010 | Story | Show source citations with each answer | 5 | backend-agent | US-009 |
| US-011 | Story | Ask questions in a chat interface | 13 | backend-agent | US-002, US-009, US-010 |
| ↳ US-011-T1 | Task | Implement streaming chat endpoints | — | backend-agent | — |
| ↳ US-011-T2 | Task | Build React chat UI with message input and display | — | frontend-agent | — |
| ↳ US-011-T3 | Task | Implement live token streaming rendering | — | frontend-agent | — |
| ↳ US-011-T4 | Task | Implement responsive layout for tablet and mobile browsers | — | frontend-agent | — |

## Sprint 5: Sprint 5

Add multi-turn follow-up context and a conversation history view.

Capacity: 20 points · Committed: 8

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-012 | Story | Multi-turn follow-up context | 5 | backend-agent | US-011 |
| US-013 | Story | View conversation history | 3 | frontend-agent | US-011 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
