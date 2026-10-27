# Hybrid Retrieval Augmented Generation chatbot — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
Hybrid Retrieval Augmented Generation chatbot for a small organization with massive data science operations. Uses only S3 bucket for documents and hosted on AWS

**Documentation version:** v3
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v2 approved |
| [Architecture](architecture/README.md) | 17 entries |
| [Development](development/README.md) | 10 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 5 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 13 requirements |
| [Changelog](CHANGELOG.md) | 3 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- Service list designates AWS Cognito as the Auth service, but the functional requirements and US-001 specify email/password login as the MVP method with Cognito/SSO only as a possible future alternative -- confirm whether Cognito is being used for email/password auth now or reserved for future SSO.
- Discrepancy: the confirmed project understanding states the system should automatically re-index on S3 add/update/delete events, but the chosen Lightweight MVP scope delivers only initial/manual indexing (see AC-010, NFR-010). Automatic re-indexing is deferred to a future version -- confirm this trade-off is accepted by stakeholders.
- Scope conflict: automatic re-indexing on S3 changes was part of the confirmed understanding but is deferred beyond this Lightweight MVP in favor of manual/on-demand indexing (also see NFR-010).
- This is the same deferral flagged against EPIC-002/US-004: confirm the accepted risk of a potentially stale index is acceptable to the organization.

### Architecture

- No requirements-phase input was provided alongside this architecture, so it is not possible to confirm which of US-001..US-013 each architectural decision satisfies.

### Development

- No record of who approved the plan or when.
- No actual sprint execution status (in-progress/done) reported -- only planned goals.
- No linkage yet to test or deployment evidence confirming any sprint's work was completed.
- No confirmation these items were actually completed within Sprint 1 -- plan only states the goal and assignment.
- US-004-T4 builds status persistence here, but exposing that status (US-007) is planned for Sprint 3 -- sequencing dependency not explicitly confirmed.
- No confirmation of completion -- plan only states the goal and assignment.
- No list of which file types/formats are 'all supported file types' provided in this input.
- No detail given on the ranking algorithm or merge weighting used in US-008-T3.
- No design artifact referenced for the chat UI's visual layout (relies on React implementation tasks only).
- No detail on how much conversational context (turn count/window) is retained.
- No acceptance criteria or auth mechanism (e.g. password policy, session handling) detailed in this input.
- No confirmation these stories were implemented or tested.
- No list of specific supported document/file formats given.
- No confirmation of implementation or indexing throughput/performance.
- Relationship between US-004-T4 (persistence, Sprint 1) and US-007 (exposure, Sprint 3) is inferred from goals, not explicitly stated as a dependency in the input.
- No detail on which Bedrock model generates answers.
- No confirmation of implementation, retrieval accuracy, or citation correctness.
- No confirmation of implementation or UI screenshots/designs referenced in this input.
- No detail on how far back conversation history is retained or where it is stored.

### Testing

- Testing phase has not started; no test plans or results exist to document.

### Deployment

- No deployment has been recorded yet; nothing to document about environments, releases, or infrastructure status.

### Maintenance

- Maintenance phase has not started; the application has not been deployed, so there is no post-deployment activity to document.
<!-- sdlc:auto:end open-gaps -->
