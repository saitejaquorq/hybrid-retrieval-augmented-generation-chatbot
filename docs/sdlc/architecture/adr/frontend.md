<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-10-25

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because Delivers the responsive chat SPA with live SSE streaming, clickable citations and an admin indexing view using React's mature component ecosystem.

## Consequences

Needs a build/hosting setup (static assets on S3/CloudFront); SPA auth state must be handled carefully against Cognito.
<!-- sdlc:auto:end adr -->