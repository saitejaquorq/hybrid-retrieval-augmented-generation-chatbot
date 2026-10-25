<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-25

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- dedicated vector database

## Decision Outcome

Chosen option: PostgreSQL 16, because Holds users, conversations, messages, citations and indexing status, and with pgvector also stores embeddings, so no separate vector DB is run at tens-of-thousands-of-documents scale.

## Consequences

pgvector ANN tuning (index type, lists/probes) needs attention as the corpus grows; keyword search is handled by Meilisearch rather than Postgres FTS per the approved stack.
<!-- sdlc:auto:end adr -->