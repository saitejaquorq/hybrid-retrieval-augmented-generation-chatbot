# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-001 · approved · source: plan:v1

Development Plan version 1 is approved and organizes the project into 5 sprints (capacity 20 points each) across 4 epics and 13 stories.

Plan status: approved, version 1. Sprint breakdown: Sprint 1 -- staff login and initial S3-to-index pipeline (chunking, embedding, hybrid index population); Sprint 2 -- enforce authenticated-only access end to end and extract text/metadata from all supported file types; Sprint 3 -- expose indexing status, implement hybrid keyword+semantic retrieval, and generate Bedrock-grounded answers; Sprint 4 -- add source citations and ship the streaming chat interface; Sprint 5 -- add multi-turn follow-up context and a conversation history view. Backlog is structured as 4 epics (EPIC-001..EPIC-004) containing 13 stories (US-001..US-013), with 3 stories (US-004, US-008, US-011) further broken into implementation tasks.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013

- ⚠ No evidence of actual code commits, pull requests, or completion status for any sprint/item -- this entry documents planned scope only.
- ⚠ Input does not explicitly assign each backlog item to a sprint; sprint-to-item relationships in this documentation are inferred from matching sprint goal wording to story titles and should be confirmed.

### SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 goal is to stand up staff login and build the initial S3-to-index pipeline (chunking, embedding, hybrid index population).

Capacity: 20 points. Goal: 'Stand up staff login and build the initial S3-to-index pipeline (chunking, embedding, hybrid index population).' Inferred associated stories: US-001 (log in with email and password) and US-004 (build the document index from the S3 bucket, including its tasks T1 S3 listing/retrieval, T2 chunking + Bedrock embedding, T3 pgvector/Meilisearch population).

**Related:** US-001, US-004

- ⚠ Sprint goal does not explicitly list item IDs; association with US-001 and US-004 is inferred from wording, not stated directly in the input.

### SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 goal is to enforce authenticated-only access end to end and extract text/metadata from all supported file types.

Capacity: 20 points. Goal: 'Enforce authenticated-only access end to end and extract text/metadata from all supported file types.' Inferred associated stories: US-002 (restrict access to authenticated staff only), US-005 (extract text from document files), US-006 (extract text and metadata from structured files).

**Related:** US-002, US-005, US-006

- ⚠ Sprint goal does not explicitly list item IDs; association with US-002, US-005, US-006 is inferred from wording.

### SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 goal is to expose indexing status, implement hybrid keyword+semantic retrieval, and generate Bedrock-grounded answers.

Capacity: 20 points. Goal: 'Expose indexing status, implement hybrid keyword+semantic retrieval, and generate Bedrock-grounded answers.' Inferred associated stories: US-007 (monitor indexing status), US-008 (hybrid retrieval over the document index, including tasks T1 Meilisearch keyword search, T2 pgvector semantic search with Titan embeddings, T3 result merging/ranking), US-009 (generate answers grounded in retrieved chunks).

**Related:** US-007, US-008, US-009

- ⚠ Sprint goal does not explicitly list item IDs; association with US-007, US-008, US-009 is inferred from wording.

### SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 goal is to add source citations and ship the streaming chat interface staff interact with.

Capacity: 20 points. Goal: 'Add source citations and ship the streaming chat interface staff interact with.' Inferred associated stories: US-010 (show source citations with each answer), US-011 (ask questions in a chat interface, including tasks T1 streaming chat endpoints, T2 React chat UI with message input/display, T3 live token streaming rendering, T4 responsive layout for tablet/mobile).

**Related:** US-010, US-011

- ⚠ Sprint goal does not explicitly list item IDs; association with US-010 and US-011 is inferred from wording.

### SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 goal is to add multi-turn follow-up context and a conversation history view.

Capacity: 20 points. Goal: 'Add multi-turn follow-up context and a conversation history view.' Inferred associated stories: US-012 (multi-turn follow-up context), US-013 (view conversation history).

**Related:** US-012, US-013

- ⚠ Sprint goal does not explicitly list item IDs; association with US-012 and US-013 is inferred from wording.

### EPIC-001 · approved · source: plan:EPIC-001

Epic covering staff authentication and access control for the chatbot.

EPIC-001 'Staff Authentication and Access Control' has no points or assigned role itself (epic-level grouping). Contains three stories: US-001 (log in with email and password, security-agent, 5 pts), US-002 (restrict access to authenticated staff only, security-agent, 5 pts), US-003 (query any document without per-document restrictions, qa-agent, 2 pts).

**Related:** US-001, US-002, US-003

### US-001 · approved · source: plan:US-001

Story: staff log in with email and password.

Points: 5. Assigned role: security-agent. Part of EPIC-001 (Staff Authentication and Access Control). Thematically placed in Sprint 1 per that sprint's goal of standing up staff login.

**Related:** EPIC-001, SPRINT-1

- ⚠ No implementation or test status provided for this story yet.

### US-002 · approved · source: plan:US-002

Story: restrict access to authenticated staff only.

Points: 5. Assigned role: security-agent. Part of EPIC-001. Thematically placed in Sprint 2 per that sprint's goal of enforcing authenticated-only access end to end.

**Related:** EPIC-001, SPRINT-2

- ⚠ No implementation or test status provided for this story yet.

### US-003 · approved · source: plan:US-003

Story: authenticated staff can query any document without per-document restrictions.

Points: 2. Assigned role: qa-agent. Part of EPIC-001 (Staff Authentication and Access Control).

**Related:** EPIC-001

- ⚠ This story is not clearly mapped to any of the 5 sprint goals in the input; sprint assignment is undetermined.
- ⚠ No implementation or test status provided for this story yet.

### EPIC-002 · approved · source: plan:EPIC-002

Epic covering document indexing of the S3 bucket contents.

EPIC-002 'Document Indexing from the S3 Bucket' has no points or assigned role itself. Contains stories: US-004 (build the document index from S3, 13 pts, backend-agent), US-005 (extract text from document files, 8 pts, backend-agent), US-006 (extract text and metadata from structured files, 5 pts, backend-agent), US-007 (monitor indexing status, 5 pts, backend-agent).

**Related:** US-004, US-005, US-006, US-007

### US-004 · approved · source: plan:US-004

Story: build the document index from the S3 bucket.

Points: 13. Assigned role: backend-agent. Part of EPIC-002, thematically placed in Sprint 1. Broken into 4 tasks: T1 -- implement S3 bucket listing and file retrieval; T2 -- implement chunking and Bedrock embedding pipeline; T3 -- populate pgvector and Meilisearch indexes from processed chunks; T4 -- implement indexing_runs status tracking and persistence (this task also underpins US-007's indexing status monitoring).

**Related:** EPIC-002, SPRINT-1, US-004-T1, US-004-T2, US-004-T3, US-004-T4

- ⚠ No implementation or test status provided for this story or its 4 tasks yet.

### US-005 · approved · source: plan:US-005

Story: extract text from document files.

Points: 8. Assigned role: backend-agent. Part of EPIC-002, thematically placed in Sprint 2 per that sprint's goal of extracting text/metadata from all supported file types.

**Related:** EPIC-002, SPRINT-2

- ⚠ No implementation or test status provided for this story yet.
- ⚠ Input does not enumerate which document file types are supported.

### US-006 · approved · source: plan:US-006

Story: extract text and metadata from structured files.

Points: 5. Assigned role: backend-agent. Part of EPIC-002, thematically placed in Sprint 2 alongside US-005.

**Related:** EPIC-002, SPRINT-2

- ⚠ No implementation or test status provided for this story yet.
- ⚠ Input does not enumerate which structured file formats are supported.

### US-007 · approved · source: plan:US-007

Story: monitor indexing status.

Points: 5. Assigned role: backend-agent. Part of EPIC-002, thematically placed in Sprint 3 per that sprint's goal of exposing indexing status. Relies on the indexing_runs tracking implemented under US-004-T4.

**Related:** EPIC-002, SPRINT-3, US-004-T4

- ⚠ No implementation or test status provided for this story yet.

### EPIC-003 · approved · source: plan:EPIC-003

Epic covering hybrid retrieval and grounded answer generation.

EPIC-003 'Hybrid Retrieval and Grounded Answer Generation' has no points or assigned role itself. Contains stories: US-008 (hybrid retrieval over the document index, 8 pts, backend-agent), US-009 (generate answers grounded in retrieved chunks, 5 pts, backend-agent), US-010 (show source citations with each answer, 5 pts, backend-agent).

**Related:** US-008, US-009, US-010

### US-008 · approved · source: plan:US-008

Story: hybrid retrieval over the document index.

Points: 8. Assigned role: backend-agent. Part of EPIC-003, thematically placed in Sprint 3. Broken into 3 tasks: T1 -- implement keyword search query against Meilisearch; T2 -- implement semantic vector search against pgvector using Titan embeddings; T3 -- implement result merging and relevance ranking.

**Related:** EPIC-003, SPRINT-3, US-008-T1, US-008-T2, US-008-T3

- ⚠ No implementation or test status provided for this story or its 3 tasks yet.

### US-009 · approved · source: plan:US-009

Story: generate answers grounded in retrieved chunks.

Points: 5. Assigned role: backend-agent. Part of EPIC-003, thematically placed in Sprint 3 per that sprint's goal of generating Bedrock-grounded answers. Depends on retrieval results produced by US-008.

**Related:** EPIC-003, SPRINT-3, US-008

- ⚠ No implementation or test status provided for this story yet.
- ⚠ Input does not specify which Bedrock model is used for generation.

### US-010 · approved · source: plan:US-010

Story: show source citations with each answer.

Points: 5. Assigned role: backend-agent. Part of EPIC-003, thematically placed in Sprint 4. Builds on grounded-answer generation from US-009.

**Related:** EPIC-003, SPRINT-4, US-009

- ⚠ No implementation or test status provided for this story yet.

### EPIC-004 · approved · source: plan:EPIC-004

Epic covering the chat experience and conversation history.

EPIC-004 'Chat Experience and Conversation History' has no points or assigned role itself. Contains stories: US-011 (ask questions in a chat interface, 13 pts, backend-agent), US-012 (multi-turn follow-up context, 5 pts, backend-agent), US-013 (view conversation history, 3 pts, frontend-agent).

**Related:** US-011, US-012, US-013

### US-011 · approved · source: plan:US-011

Story: ask questions in a chat interface.

Points: 13. Assigned role: backend-agent (overall story), with frontend-agent handling UI tasks. Part of EPIC-004, thematically placed in Sprint 4. Broken into 4 tasks: T1 -- implement streaming chat endpoints (backend-agent); T2 -- build React chat UI with message input and display (frontend-agent); T3 -- implement live token streaming rendering (frontend-agent); T4 -- implement responsive layout for tablet and mobile browsers (frontend-agent).

**Related:** EPIC-004, SPRINT-4, US-011-T1, US-011-T2, US-011-T3, US-011-T4

- ⚠ No implementation or test status provided for this story or its 4 tasks yet.

### US-012 · approved · source: plan:US-012

Story: multi-turn follow-up context in conversations.

Points: 5. Assigned role: backend-agent. Part of EPIC-004, thematically placed in Sprint 5. Depends on the chat interface from US-011.

**Related:** EPIC-004, SPRINT-5, US-011

- ⚠ No implementation or test status provided for this story yet.

### US-013 · approved · source: plan:US-013

Story: view conversation history.

Points: 3. Assigned role: frontend-agent. Part of EPIC-004, thematically placed in Sprint 5.

**Related:** EPIC-004, SPRINT-5

- ⚠ No implementation or test status provided for this story yet.
<!-- sdlc:auto:end narrative -->
