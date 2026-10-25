# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-SCOPE · approved · source: requirements:scope

Project delivery scope is set to 'lightweight', requirements version 2. Defines in-scope capabilities and explicit exclusions.

In scope: chat interface, hybrid (keyword+semantic) retrieval, Bedrock-grounded LLM answers, source citations, multi-turn follow-up context, manual/initial S3-based indexing, text extraction from PDF/Word/Markdown/text, text+metadata extraction from CSV/JSON/notebooks, authenticated staff login (email/password), conversation history, responsive web app only. Out of scope: live analytical querying/computation over datasets (e.g. SQL/stats on CSV/Parquet contents), and native mobile/desktop apps.

### REQ-STACK · approved · source: requirements:technology stack

Technology stack approved by the product owner: FastAPI 0.115 backend, AWS cloud, PostgreSQL 16 (with pgvector), React 19 frontend.

Backend FastAPI 0.115 chosen for Python-native document parsing/chunking/embedding/orchestration and streaming support. Cloud is AWS, a firm requirement since documents live in S3 and auth/LLM (Cognito/Bedrock) must run on AWS to avoid cross-cloud egress and enable S3 event notifications. Database PostgreSQL 16 with pgvector stores chat history, conversation context, user records, indexing status, and embeddings in one system, avoiding a separate vector DB at this workload scale. Frontend React 19 chosen for a responsive chat UI with streaming, clickable citations, and an admin indexing-status view. Stack elements must be used exactly as specified, no substitutions.

### REQ-SERVICES · approved · source: requirements:runtime services

Approved runtime services: Amazon S3 (storage), pgvector (vector store), Meilisearch (lexical search), Redis (queue + cache), Amazon Bedrock (generation + Titan embeddings), AWS Cognito (auth).

S3 (saas; env AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET) is the sole document source, read for indexing and (future) change events. pgvector (in PostgreSQL) holds embeddings for semantic search. Meilisearch (getmeili/meilisearch:v1.10.3) provides lexical/keyword matching for hybrid retrieval. Redis (redis:7-alpine) is used both as a background job queue for parsing/embedding/re-indexing and as a cache for conversation state and frequent query/embedding results. Amazon Bedrock (custom; env AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BEDROCK_MODEL_ID) generates grounded, cited answers. Amazon Bedrock Titan Embeddings (custom; env AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BEDROCK_EMBEDDING_MODEL_ID) generates vectors for documents and questions. AWS Cognito (custom; env COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID, COGNITO_CLIENT_SECRET, AWS_REGION) is listed as the auth service, though functional requirements specify email/password as the MVP login method, with Cognito/SSO as a possible future alternative -- see open gap.

**Related:** EPIC-002, EPIC-003

- ⚠ Service list designates AWS Cognito as the Auth service, but the functional requirements and US-001 specify email/password login as the MVP method with Cognito/SSO only as a possible future alternative -- confirm whether Cognito is being used for email/password auth now or reserved for future SSO.

### EPIC-001 · draft · source: requirements:EPIC-001

Staff Authentication and Access Control: only authenticated internal staff may use the chatbot, via email/password login, with no per-document/per-team access restrictions once authenticated.

Covers US-001 (email/password login), US-002 (restrict chat/answers to authenticated staff only), US-003 (any authenticated staff may query any indexed document, no per-document/team filter). Company SSO such as Cognito is noted as a possible future alternative, not MVP scope.

**Related:** US-001, US-002, US-003, NFR-005, NFR-006

### US-001 · draft · source: requirements:US-001

Internal staff log in with email and password to reach the chat interface.

Priority: critical. Given a registered staff member submits a valid email/password, they are authenticated and taken to the chat interface (AC-001). Given an incorrect email or password, the user is not logged in and sees an error message that does not reveal which field was wrong (AC-002, ties to NFR-006). Email/password is the supported MVP login method; company SSO (e.g. AWS Cognito) is recorded only as a possible future alternative, not an MVP requirement (AC-003).

**Related:** EPIC-001, AC-001, AC-002, AC-003, NFR-006

### US-002 · draft · source: requirements:US-002

Chat interface and answer endpoint are available only to authenticated staff.

Priority: critical. An unauthenticated user trying to open the chat interface or call the answer endpoint directly is redirected to login with no document content or answer returned (AC-004). Once a session expires or the user logs out, they must re-authenticate before submitting another question (AC-005).

**Related:** EPIC-001, AC-004, AC-005, NFR-005

### US-003 · draft · source: requirements:US-003

Any logged-in staff member can query and get answers grounded in any indexed document, regardless of which team produced it.

Priority: high. No per-document or per-team access filter is applied to retrieval or citation for authenticated staff (AC-006).

**Related:** EPIC-001, AC-006

### EPIC-002 · draft · source: requirements:EPIC-002

Document index is built from the single S3 bucket via manual/on-demand indexing in this MVP, with text/metadata extraction and an admin status view.

Covers US-004 (manual index build from S3), US-005 (text extraction from PDF/Word/Markdown/text), US-006 (text+metadata extraction from CSV/JSON/notebooks), US-007 (admin indexing status view).

**Related:** US-004, US-005, US-006, US-007, NFR-002, NFR-009, NFR-010

- ⚠ Discrepancy: the confirmed project understanding states the system should automatically re-index on S3 add/update/delete events, but the chosen Lightweight MVP scope delivers only initial/manual indexing (see AC-010, NFR-010). Automatic re-indexing is deferred to a future version -- confirm this trade-off is accepted by stakeholders.

### US-004 · draft · source: requirements:US-004

An administrator triggers indexing runs on demand to build the hybrid index from the single S3 bucket.

Priority: critical. Each supported file in S3 is processed, chunked, embedded, and added to the hybrid (keyword + vector) index when valid AWS credentials are configured (AC-007). Re-running indexing after S3 changes reflects the current file set (AC-008). Only the single configured S3 bucket is read -- no other sources such as Google Drive or Confluence (AC-009). Indexing is manual/on-demand in this version; automatic re-indexing on S3 changes is documented as deferred future scope (AC-010).

**Related:** EPIC-002, AC-007, AC-008, AC-009, AC-010, NFR-002, NFR-010

- ⚠ Scope conflict: automatic re-indexing on S3 changes was part of the confirmed understanding but is deferred beyond this Lightweight MVP in favor of manual/on-demand indexing (also see NFR-010).

### US-005 · draft · source: requirements:US-005

Readable text is extracted from PDF, Word, Markdown and plain text files during indexing.

Priority: critical. Extracted text is stored as searchable chunks tied to the source filename/location (AC-011). If a file's text cannot be extracted (corrupt/unsupported encoding), it is skipped and the failure is recorded in indexing status rather than aborting the whole run (AC-012, ties to NFR-009).

**Related:** EPIC-002, AC-011, AC-012, NFR-009

### US-006 · draft · source: requirements:US-006

Text and metadata are extracted from CSV, JSON and notebook files during indexing for retrieval as text content only.

Priority: high. Textual content and metadata (filename, column/field names, notebook cell text) are extracted into searchable chunks (AC-013). Structured files are handled as extracted text only -- no live analytical query or computation over the dataset is performed when answering questions about them, consistent with the stated out-of-scope item (AC-014).

**Related:** EPIC-002, AC-013, AC-014

### US-007 · draft · source: requirements:US-007

Admin view shows indexing status: files indexed, skipped/failed, and last completion time.

Priority: medium. After a run, the admin indexing view shows number of files indexed, any skipped/failed files, and when indexing last completed (AC-015). While a run is in progress, the view shows that indexing is currently running (AC-016).

**Related:** EPIC-002, AC-015, AC-016

### EPIC-003 · draft · source: requirements:EPIC-003

Hybrid retrieval (keyword + semantic via Titan Embeddings) feeds retrieved chunks to a Bedrock-hosted LLM to generate grounded, cited answers.

Covers US-008 (hybrid retrieval), US-009 (grounded generation via Bedrock), US-010 (source citations). Open assumption: Bedrock is used for both embeddings and generation to keep documents within AWS; could be swapped for another provider (e.g. OpenAI) in future.

**Related:** US-008, US-009, US-010, NFR-007

### US-008 · draft · source: requirements:US-008

Each question is answered using combined keyword/lexical and semantic/vector search over the index.

Priority: critical. Candidate chunks are retrieved by combining keyword/lexical results with semantic/vector results (from Titan Embeddings), and the most relevant chunks are selected as context (AC-017). If no sufficiently relevant chunks are found, the system responds that it could not find relevant information rather than fabricating an answer (AC-018).

**Related:** EPIC-003, AC-017, AC-018

### US-009 · draft · source: requirements:US-009

An LLM served via Amazon Bedrock generates answers based on retrieved chunks.

Priority: critical. Given retrieved chunks, Bedrock produces the answer (AC-019). If AWS/Bedrock credentials or model access are missing or invalid, the system surfaces an error that the answer could not be generated, rather than returning an ungrounded response (AC-020).

**Related:** EPIC-003, AC-019, AC-020, NFR-007

### US-010 · draft · source: requirements:US-010

Each answer displays the source document(s) it was based on, by filename/location.

Priority: high. The answer lists the source document(s) used (AC-021). When multiple source documents contribute to an answer, each distinct source is cited (AC-022).

**Related:** EPIC-003, AC-021, AC-022

### EPIC-004 · draft · source: requirements:EPIC-004

Chat experience: a responsive web chat interface with multi-turn follow-up context and viewable conversation history.

Covers US-011 (chat Q&A interface), US-012 (multi-turn follow-up context), US-013 (view conversation history). Delivered as a responsive web app only -- no native mobile/desktop app.

**Related:** US-011, US-012, US-013, NFR-003, NFR-004, NFR-008

### US-011 · draft · source: requirements:US-011

Staff type questions and read grounded, cited answers in a chat interface that works on smaller screens too.

Priority: critical. Submitting a question adds it to the conversation and returns a grounded answer with citations (AC-023). As a responsive web app, the interface remains usable and readable on tablet/phone browsers without a native app (AC-024).

**Related:** EPIC-004, AC-023, AC-024, NFR-004, NFR-008

### US-012 · draft · source: requirements:US-012

Follow-up questions are interpreted using prior conversation turns.

Priority: high. A follow-up referring to a previous turn (e.g. "what about last year?") is interpreted using prior conversation context for retrieval and answering (AC-025).

**Related:** EPIC-004, AC-025, NFR-003

### US-013 · draft · source: requirements:US-013

Staff can view their past conversation messages, including citations, in order.

Priority: medium. Viewing an ongoing or past conversation shows earlier questions and answers in order, including the citations shown with each answer (AC-026).

**Related:** EPIC-004, AC-026

### NFR-001 · draft · source: requirements:NFR-001

System must support tens of concurrent staff users and an index of tens of thousands of documents.

Scalability requirement applying to the whole system: target is tens of concurrent users and tens of thousands of indexed documents.

### NFR-002 · draft · source: requirements:NFR-002

Parsing, embedding and re-indexing run in the background via a queue so chat is never blocked.

Performance requirement: background indexing work (parsing, embedding, re-indexing) must not block or slow the chat interface for users asking questions. Applies to US-004, US-005, US-006.

**Related:** US-004, US-005, US-006

### NFR-003 · draft · source: requirements:NFR-003

Conversation state and frequent query/embedding results are cached so repeated questions answer quickly.

Performance requirement applying to US-011 and US-012; caching is used to keep repeated/similar questions fast.

**Related:** US-011, US-012

### NFR-004 · draft · source: requirements:NFR-004

Answers stream live to the chat interface as they are generated.

Performance requirement applying to US-011: staff see the response appear live rather than waiting for the whole answer to complete.

**Related:** US-011

### NFR-005 · draft · source: requirements:NFR-005

Chat interface and answer endpoint return content only to authenticated staff.

Security requirement applying to US-002: unauthenticated requests are redirected to login with no content returned; expired sessions or logout require re-authentication before further questions.

**Related:** US-002

### NFR-006 · draft · source: requirements:NFR-006

Login failure messages must not reveal whether the email or password was wrong.

Security requirement applying to US-001.

**Related:** US-001

### NFR-007 · draft · source: requirements:NFR-007

Documents, embeddings and generated answers stay within the organization's AWS environment, never sent to a third party.

Privacy requirement applying to the whole system, enforced via Amazon Bedrock for both generation and embeddings.

### NFR-008 · draft · source: requirements:NFR-008

Chat interface is a responsive web app usable on tablet/phone browsers, no native app required.

Usability requirement applying to US-011.

**Related:** US-011

### NFR-009 · draft · source: requirements:NFR-009

A single file that fails to parse is skipped and recorded, without aborting the whole indexing run.

Availability requirement applying to US-005 and US-006.

**Related:** US-005, US-006

### NFR-010 · draft · source: requirements:NFR-010

Automatic re-indexing on S3 changes is deferred; this MVP supports manual/on-demand indexing only (accepted risk).

Availability requirement applying to US-004, explicitly recorded as an accepted risk: the index can become out of date until an administrator re-runs indexing.

**Related:** US-004

- ⚠ This is the same deferral flagged against EPIC-002/US-004: confirm the accepted risk of a potentially stale index is acceptable to the organization.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v2  
**Delivery scope:** lightweight  
**Approved:** 2026-10-25

**Capabilities in scope:** Chat interface for asking questions, Hybrid retrieval combining keyword and semantic search over the document index, LLM-generated answers grounded in retrieved document chunks, Source citations shown with each answer, Multi-turn follow-up conversation context, Document index built from the S3 bucket (initial/manual indexing), Text extraction from PDF, Word, Markdown and text files, Text and metadata extraction from CSV, JSON and notebook files, Authenticated staff login, Conversation history, Amazon Bedrock for answer generation, Amazon Bedrock Titan Embeddings for semantic search, Single S3 bucket as the only document source, Email/password staff login, Responsive web application (no native mobile/desktop app)

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The whole product is a Python-shaped problem: document parsing, chunking, embedding calls, and orchestrating retrieval before calling the LLM. FastAPI is Python, so it sits in the same ecosystem as the data-science libraries your organization already uses, and it handles the streaming responses a chat UI needs. This keeps one language across indexing and serving. |
| cloud | AWS | This was a firm requirement: the documents already live in an S3 bucket, the organization wants to stay within AWS, and authentication and the LLM are expected to run on AWS (Cognito and Bedrock). Hosting on AWS keeps the data next to its source, avoids cross-cloud egress, and lets you use the S3 event notifications that trigger re-indexing. |
| database | PostgreSQL | You need to store chat history, multi-turn conversation context, user records, and indexing status — plus the document vectors for semantic search. PostgreSQL covers all of this in one system, and with the pgvector extension it holds your embeddings too, so you avoid running a separate vector database for a medium-scale workload of tens of thousands of documents. |
| frontend | React | Your staff need a responsive chat interface with live message streaming, source citations they can click, and an admin view of indexing status. React is the mature default for this kind of interactive internal web app and has the richest set of ready-made chat and UI components, which keeps the build fast for a small team. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Staff Authentication and Access Control

Only authenticated internal staff can use the chatbot. Login is via email/password (company SSO such as AWS Cognito is a possible alternative per assumption, but email/password is the MVP method). Once logged in, any staff member may query any indexed document — there are no per-document or per-team access restrictions.

### US-001: Log in with email and password

**Priority:** critical

> As a internal staff member, I want to log in to the chatbot with my email and password, so that I can access the organization's documents through the chat interface.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am a registered staff member on the login page | I submit a valid email and password | I am authenticated and taken to the chat interface |
| AC-002 | I am on the login page | I submit an incorrect email or password | I am not logged in and I see an error message that does not reveal which field was wrong |
| AC-003 | the organization may prefer company SSO (e.g. AWS Cognito) as noted in the open assumptions | the MVP is delivered | email/password is the supported login method and SSO is recorded as a possible future alternative rather than an MVP requirement |

### US-002: Restrict access to authenticated staff only

**Priority:** critical

> As a organization owner of the internal tool, I want the chatbot and its answers to be available only to authenticated staff, so that internal documents are not exposed to unauthenticated or external users.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I am not logged in | I try to open the chat interface or call the answer endpoint directly | I am redirected to login and no document content or answer is returned |
| AC-005 | I am logged in | my session expires or I log out | I must authenticate again before I can submit another question |

### US-003: Query any document without per-document restrictions

**Priority:** high

> As a logged-in staff member, I want to be able to query and receive answers grounded in any document in the index, so that I can find information regardless of which team produced it.

| ID | Given | When | Then |
|---|---|---|---|
| AC-006 | I am an authenticated staff member | I ask a question whose answer lives in any indexed document | the system retrieves and cites that document without applying any per-document or per-team access filter |

## EPIC-002: Document Indexing from the S3 Bucket

The document index is built from a single S3 bucket, the only document source. The MVP delivers initial/manual index building. Text is extracted from PDF, Word, Markdown and text files, and text plus metadata is extracted from CSV, JSON and notebook files. An admin view shows indexing status. Note (open assumption / scope conflict): the confirmed understanding states the system should automatically re-index on S3 add/update/delete, but the chosen Lightweight MVP scope covers initial/manual indexing only; automatic re-indexing is deferred beyond this version and recorded here so it is not lost.

### US-004: Build the document index from the S3 bucket

**Priority:** critical

> As a administrator, I want to build the search index from the files in the single S3 bucket on demand, so that staff can get answers grounded in the organization's current documents.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | the S3 bucket contains supported documents and valid AWS credentials are configured | I trigger an indexing run | each supported file is processed, chunked, embedded and added to the hybrid (keyword + vector) index |
| AC-008 | an indexing run is triggered again after files have changed in S3 | the run completes | the index reflects the current set of files processed in that run |
| AC-009 | the single S3 bucket is the only configured document source | indexing runs | no other source (e.g. Google Drive, Confluence) is read |
| AC-010 | the confirmed understanding requires automatic re-indexing on S3 changes but the MVP scope is initial/manual indexing | this version is delivered | indexing is performed manually/on demand and automatic re-indexing is documented as deferred future scope |

### US-005: Extract text from document files

**Priority:** critical

> As a administrator, I want text extracted from PDF, Word, Markdown and plain text files during indexing, so that their content is searchable and can ground answers.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | a PDF, Word, Markdown or text file in the bucket | it is indexed | its readable text is extracted and stored as searchable chunks associated with the source filename/location |
| AC-012 | a file whose text cannot be extracted (e.g. corrupt or unsupported encoding) | indexing processes it | the file is skipped and the failure is recorded in the indexing status rather than aborting the whole run |

### US-006: Extract text and metadata from structured files

**Priority:** high

> As a administrator, I want text and metadata extracted from CSV, JSON and notebook files during indexing, so that structured data science files are retrievable as text content.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | a CSV, JSON or notebook file in the bucket | it is indexed | its textual content and metadata (e.g. filename, column/field names, notebook cell text) are extracted into searchable chunks |
| AC-014 | the open assumption that structured files are handled as extracted text only | a user later asks a question about such a file | the system retrieves the indexed text/metadata and does not run any live analytical query or computation over the dataset (out of scope) |

### US-007: Monitor indexing status

**Priority:** medium

> As a administrator, I want a view showing the status of indexing, so that I can confirm the index is current and spot files that failed to index.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | an indexing run has been performed | I open the admin indexing view | I can see the number of files indexed, any files skipped/failed, and when indexing last completed |
| AC-016 | an indexing run is in progress | I open the admin indexing view | I can see that indexing is running |

## EPIC-003: Hybrid Retrieval and Grounded Answer Generation

When a staff member asks a question, the system performs hybrid retrieval — combining keyword/lexical search with semantic/vector search (using Amazon Bedrock Titan Embeddings) over the index — and passes the retrieved chunks to an LLM via Amazon Bedrock to generate an answer grounded in those chunks, with source citations. Open assumption: Bedrock is used for both embeddings and generation to stay within AWS and requires AWS/Bedrock credentials and model access; it could be swapped for another provider (e.g. OpenAI).

### US-008: Hybrid retrieval over the document index

**Priority:** critical

> As a staff member, I want my question answered using both keyword and semantic search over the index, so that relevant content is found whether I use exact terms or paraphrase.

| ID | Given | When | Then |
|---|---|---|---|
| AC-017 | an indexed document set and a question I submit | the system retrieves candidate chunks | it combines keyword/lexical results with semantic/vector results (from Titan Embeddings) and selects the most relevant chunks to use as context |
| AC-018 | my question has no relevant matches in the index | retrieval returns no sufficiently relevant chunks | the system responds that it could not find relevant information rather than fabricating an answer |

### US-009: Generate answers grounded in retrieved chunks

**Priority:** critical

> As a staff member, I want the LLM to generate an answer based on the retrieved document chunks, so that I get a direct answer grounded in the organization's documents.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | relevant chunks have been retrieved for my question | the answer is generated | an LLM served via Amazon Bedrock produces an answer based on those chunks |
| AC-020 | the open assumption that Bedrock provides embeddings and generation | AWS/Bedrock credentials or model access are missing or invalid | the system surfaces an error indicating the answer could not be generated rather than returning an ungrounded response |

### US-010: Show source citations with each answer

**Priority:** high

> As a staff member, I want each answer to cite the source documents it was based on, so that I can verify the answer against the original documents.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | an answer generated from retrieved chunks | the answer is displayed | it lists the source document(s) by filename/location used to produce it |
| AC-022 | an answer that uses multiple source documents | the answer is displayed | each distinct source used is cited |

## EPIC-004: Chat Experience and Conversation History

Staff interact through a chat interface delivered as a responsive web application (no native mobile/desktop app). The chat supports multi-turn follow-up context so follow-up questions are interpreted in light of earlier turns, and users can see their conversation history.

### US-011: Ask questions in a chat interface

**Priority:** critical

> As a staff member, I want to type questions and read answers in a chat interface, so that I can query the organization's documents conversationally.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | I am logged in on the chat interface | I type a question and submit it | my message appears in the conversation and a grounded answer with citations is returned and displayed |
| AC-024 | the app is delivered as a responsive web application | I open it on a smaller screen such as a tablet or phone browser | the chat interface remains usable and readable without a native app |

### US-012: Multi-turn follow-up context

**Priority:** high

> As a staff member, I want follow-up questions to take earlier turns of the conversation into account, so that I can ask natural follow-ups without repeating context.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | I have asked a question and received an answer | I ask a follow-up that refers to the previous turn (e.g. "what about last year?") | the system interprets it using the prior conversation context and retrieves/answers accordingly |

### US-013: View conversation history

**Priority:** medium

> As a staff member, I want to see my past conversation messages, so that I can review earlier questions and answers.

| ID | Given | When | Then |
|---|---|---|---|
| AC-026 | I have an ongoing or past conversation | I view the conversation | I can see the earlier questions and answers in order, including their citations |
<!-- sdlc:auto:end epics -->
