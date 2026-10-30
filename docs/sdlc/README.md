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
| [Development](development/README.md) | 23 entries |
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

- No evidence of actual code commits, pull requests, or completion status for any sprint/item -- this entry documents planned scope only.
- Input does not explicitly assign each backlog item to a sprint; sprint-to-item relationships in this documentation are inferred from matching sprint goal wording to story titles and should be confirmed.
- Sprint goal does not explicitly list item IDs; association with US-001 and US-004 is inferred from wording, not stated directly in the input.
- Sprint goal does not explicitly list item IDs; association with US-002, US-005, US-006 is inferred from wording.
- Sprint goal does not explicitly list item IDs; association with US-007, US-008, US-009 is inferred from wording.
- Sprint goal does not explicitly list item IDs; association with US-010 and US-011 is inferred from wording.
- Sprint goal does not explicitly list item IDs; association with US-012 and US-013 is inferred from wording.
- No implementation or test status provided for this story yet.
- This story is not clearly mapped to any of the 5 sprint goals in the input; sprint assignment is undetermined.
- No implementation or test status provided for this story or its 4 tasks yet.
- Input does not enumerate which document file types are supported.
- Input does not enumerate which structured file formats are supported.
- No implementation or test status provided for this story or its 3 tasks yet.
- Input does not specify which Bedrock model is used for generation.

### Testing

- Testing phase has not started; no test plans or results exist to document.

### Deployment

- No deployment has been recorded yet; nothing to document about environments, releases, or infrastructure status.

### Maintenance

- Maintenance phase has not started; the application has not been deployed, so there is no post-deployment activity to document.
<!-- sdlc:auto:end open-gaps -->
