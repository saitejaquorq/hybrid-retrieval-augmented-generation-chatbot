# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-1 · approved · source: plan:v1

Development plan version 1 is approved, organizing the full backlog into 5 sprints of 20-point capacity each, progressing from authentication and initial indexing through to multi-turn chat with history.

Plan status: approved, version 1. Five sprints, each capacity=20 points: Sprint 1 (login + initial S3-to-index pipeline), Sprint 2 (end-to-end auth enforcement + multi-format text/metadata extraction), Sprint 3 (indexing status visibility + hybrid retrieval + Bedrock-grounded answers), Sprint 4 (source citations + streaming chat UI), Sprint 5 (multi-turn follow-up context + conversation history view). Backlog comprises 4 epics (EPIC-001..004) and stories US-001 through US-013, several decomposed into subtasks.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013

- ⚠ No record of who approved the plan or when.
- ⚠ No actual sprint execution status (in-progress/done) reported -- only planned goals.
- ⚠ No linkage yet to test or deployment evidence confirming any sprint's work was completed.

### DEV-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 targets standing up staff login and building the initial S3-to-index pipeline (listing/retrieval, chunking, embedding, hybrid index population).

Goal: Stand up staff login and build the initial S3-to-index pipeline (chunking, embedding, hybrid index population). Capacity: 20 points. Planned work: US-001 Log in with email and password (5 pts, security-agent); US-004 Build the document index from the S3 bucket (13 pts, backend-agent) via subtasks US-004-T1 Implement S3 bucket listing and file retrieval, US-004-T2 Implement chunking and Bedrock embedding pipeline, US-004-T3 Populate pgvector and Meilisearch indexes from processed chunks, US-004-T4 Implement indexing_runs status tracking and persistence.

**Related:** US-001, US-004

- ⚠ No confirmation these items were actually completed within Sprint 1 -- plan only states the goal and assignment.
- ⚠ US-004-T4 builds status persistence here, but exposing that status (US-007) is planned for Sprint 3 -- sequencing dependency not explicitly confirmed.

### DEV-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 targets enforcing authenticated-only access end to end and extracting text/metadata from all supported file types.

Goal: Enforce authenticated-only access end to end and extract text/metadata from all supported file types. Capacity: 20 points. Planned work: US-002 Restrict access to authenticated staff only (5 pts, security-agent); US-003 Query any document without per-document restrictions (2 pts, qa-agent); US-005 Extract text from document files (8 pts, backend-agent); US-006 Extract text and metadata from structured files (5 pts, backend-agent).

**Related:** US-002, US-003, US-005, US-006

- ⚠ No confirmation of completion -- plan only states the goal and assignment.
- ⚠ No list of which file types/formats are 'all supported file types' provided in this input.

### DEV-SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 targets exposing indexing status, implementing hybrid keyword+semantic retrieval, and generating Bedrock-grounded answers.

Goal: Expose indexing status, implement hybrid keyword+semantic retrieval, and generate Bedrock-grounded answers. Capacity: 20 points. Planned work: US-007 Monitor indexing status (5 pts, backend-agent); US-008 Hybrid retrieval over the document index (8 pts, backend-agent) via subtasks US-008-T1 Implement keyword search query against Meilisearch, US-008-T2 Implement semantic vector search against pgvector using Titan embeddings, US-008-T3 Implement result merging and relevance ranking; US-009 Generate answers grounded in retrieved chunks (5 pts, backend-agent).

**Related:** US-007, US-008, US-009

- ⚠ No confirmation of completion -- plan only states the goal and assignment.
- ⚠ No detail given on the ranking algorithm or merge weighting used in US-008-T3.

### DEV-SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 targets adding source citations to answers and shipping the streaming chat interface staff interact with.

Goal: Add source citations and ship the streaming chat interface staff interact with. Capacity: 20 points. Planned work: US-010 Show source citations with each answer (5 pts, backend-agent); US-011 Ask questions in a chat interface (13 pts, backend-agent) via subtasks US-011-T1 Implement streaming chat endpoints (backend-agent), US-011-T2 Build React chat UI with message input and display (frontend-agent), US-011-T3 Implement live token streaming rendering (frontend-agent), US-011-T4 Implement responsive layout for tablet and mobile browsers (frontend-agent).

**Related:** US-010, US-011

- ⚠ No confirmation of completion -- plan only states the goal and assignment.
- ⚠ No design artifact referenced for the chat UI's visual layout (relies on React implementation tasks only).

### DEV-SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 targets adding multi-turn follow-up context handling and a conversation history view.

Goal: Add multi-turn follow-up context and a conversation history view. Capacity: 20 points. Planned work: US-012 Multi-turn follow-up context (5 pts, backend-agent); US-013 View conversation history (3 pts, frontend-agent).

**Related:** US-012, US-013

- ⚠ No confirmation of completion -- plan only states the goal and assignment.
- ⚠ No detail on how much conversational context (turn count/window) is retained.

### EPIC-001 · approved · source: plan:EPIC-001

Epic covering staff authentication and access control: login, enforcing authenticated-only access, and unrestricted querying across all documents once authenticated.

Epic: Staff Authentication and Access Control (no points/role assigned at epic level). Child stories: US-001 Log in with email and password (5 pts, security-agent, Sprint 1); US-002 Restrict access to authenticated staff only (5 pts, security-agent, Sprint 2); US-003 Query any document without per-document restrictions (2 pts, qa-agent, Sprint 2).

**Related:** US-001, US-002, US-003

- ⚠ No acceptance criteria or auth mechanism (e.g. password policy, session handling) detailed in this input.
- ⚠ No confirmation these stories were implemented or tested.

### EPIC-002 · approved · source: plan:EPIC-002

Epic covering building and maintaining the document index from the S3 bucket, including text/metadata extraction and indexing status monitoring.

Epic: Document Indexing from the S3 Bucket (no points/role assigned at epic level). Child stories: US-004 Build the document index from the S3 bucket (13 pts, backend-agent, Sprint 1) with subtasks US-004-T1 S3 bucket listing and file retrieval, US-004-T2 chunking and Bedrock embedding pipeline, US-004-T3 populate pgvector and Meilisearch indexes, US-004-T4 indexing_runs status tracking and persistence; US-005 Extract text from document files (8 pts, backend-agent, Sprint 2); US-006 Extract text and metadata from structured files (5 pts, backend-agent, Sprint 2); US-007 Monitor indexing status (5 pts, backend-agent, Sprint 3), which exposes the status US-004-T4 persists.

**Related:** US-004, US-005, US-006, US-007

- ⚠ No list of specific supported document/file formats given.
- ⚠ No confirmation of implementation or indexing throughput/performance.
- ⚠ Relationship between US-004-T4 (persistence, Sprint 1) and US-007 (exposure, Sprint 3) is inferred from goals, not explicitly stated as a dependency in the input.

### EPIC-003 · approved · source: plan:EPIC-003

Epic covering hybrid keyword+semantic retrieval over the index and generating Bedrock-grounded answers with source citations.

Epic: Hybrid Retrieval and Grounded Answer Generation (no points/role assigned at epic level). Child stories: US-008 Hybrid retrieval over the document index (8 pts, backend-agent, Sprint 3) with subtasks US-008-T1 keyword search against Meilisearch, US-008-T2 semantic vector search against pgvector using Titan embeddings, US-008-T3 result merging and relevance ranking; US-009 Generate answers grounded in retrieved chunks (5 pts, backend-agent, Sprint 3); US-010 Show source citations with each answer (5 pts, backend-agent, Sprint 4).

**Related:** US-008, US-009, US-010

- ⚠ No detail on which Bedrock model generates answers.
- ⚠ No confirmation of implementation, retrieval accuracy, or citation correctness.

### EPIC-004 · approved · source: plan:EPIC-004

Epic covering the chat experience: the streaming chat interface, multi-turn follow-up context, and conversation history view.

Epic: Chat Experience and Conversation History (no points/role assigned at epic level). Child stories: US-011 Ask questions in a chat interface (13 pts, backend-agent, Sprint 4) with subtasks US-011-T1 streaming chat endpoints (backend-agent), US-011-T2 React chat UI with message input/display (frontend-agent), US-011-T3 live token streaming rendering (frontend-agent), US-011-T4 responsive layout for tablet/mobile (frontend-agent); US-012 Multi-turn follow-up context (5 pts, backend-agent, Sprint 5); US-013 View conversation history (3 pts, frontend-agent, Sprint 5).

**Related:** US-011, US-012, US-013

- ⚠ No confirmation of implementation or UI screenshots/designs referenced in this input.
- ⚠ No detail on how far back conversation history is retained or where it is stored.
<!-- sdlc:auto:end narrative -->
