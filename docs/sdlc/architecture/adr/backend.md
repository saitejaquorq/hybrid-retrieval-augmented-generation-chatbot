<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-10-25

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Flask
- Django

## Decision Outcome

Chosen option: FastAPI 0.115, because One Python service covers extraction, chunking, embedding calls, hybrid retrieval orchestration and streaming responses, sitting in the same ecosystem as the org's data-science libraries.

## Consequences

Async streaming and background separation require a worker process and queue rather than in-request processing.
<!-- sdlc:auto:end adr -->