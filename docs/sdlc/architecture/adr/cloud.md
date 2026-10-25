<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-10-25

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because Documents already live in S3 and Bedrock plus Cognito run natively here, keeping data next to its source and all documents, embeddings and answers inside the org's AWS environment.

## Consequences

Ties the design to AWS services (Bedrock, Cognito, S3); Bedrock model access must be enabled in the chosen region.
<!-- sdlc:auto:end adr -->