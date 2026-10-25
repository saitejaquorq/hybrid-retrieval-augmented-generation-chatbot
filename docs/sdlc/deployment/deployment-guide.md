# Deployment Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start how-it-deploys -->
Pushes to `main` run `.github/workflows/deploy.yml`, which builds the API image (if there is a backend) and deploys the SPA to AWS Amplify. Commits touching only `docs/sdlc/**` don't deploy. Deployments can also be started from the platform's Deployment tab.
<!-- sdlc:auto:end how-it-deploys -->

<!-- sdlc:auto:start environments -->
| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| Web App (React 19) | Static SPA on S3 + CloudFront | Static assets | CDN edge | dev |
| RAG API (FastAPI 0.115) | ECS Fargate service | Python 3.12 / Uvicorn | 1-3 tasks | dev |
| Indexing Worker (FastAPI 0.115 codebase) | ECS Fargate service | Python 3.12 / RQ worker | 1-2 tasks | dev |
| PostgreSQL 16 + pgvector | Amazon RDS for PostgreSQL | PostgreSQL 16 | single instance | dev |
| Meilisearch | ECS Fargate (getmeili/meilisearch:v1.10.3) | Container | single task | dev |
| Redis 7 | Amazon ElastiCache (or redis:7-alpine container) | Redis 7 | single node | dev |
| Document Bucket | Amazon S3 | Managed | managed | dev |
| Amazon Bedrock | Bedrock (LLM + Titan Embeddings) | Managed | managed | dev |
| AWS Cognito | Cognito User Pool | Managed | managed | dev |
<!-- sdlc:auto:end environments -->

<!-- sdlc:auto:start live -->
_Not deployed yet._
<!-- sdlc:auto:end live -->

<!-- sdlc:auto:start topology -->
```mermaid
graph LR
  n_Web_App__React_19_["Web App (React 19)<br/>Static SPA on S3 + CloudFront"]
  n_RAG_API__FastAPI_0_115_["RAG API (FastAPI 0.115)<br/>ECS Fargate service"]
  n_Indexing_Worker__FastAPI_0_115_codebase_["Indexing Worker (FastAPI 0.115 codebase)<br/>ECS Fargate service"]
  n_PostgreSQL_16___pgvector["PostgreSQL 16 + pgvector<br/>Amazon RDS for PostgreSQL"]
  n_Meilisearch["Meilisearch<br/>ECS Fargate (getmeili/meilisearch:v1.10.3)"]
  n_Redis_7["Redis 7<br/>Amazon ElastiCache (or redis:7-alpine container)"]
  n_Document_Bucket["Document Bucket<br/>Amazon S3"]
  n_Amazon_Bedrock["Amazon Bedrock<br/>Bedrock (LLM + Titan Embeddings)"]
  n_AWS_Cognito["AWS Cognito<br/>Cognito User Pool"]
  n_Web_App__React_19_ -->|"HTTPS"| n_RAG_API__FastAPI_0_115_
  n_Web_App__React_19_ -->|"HTTPS"| n_AWS_Cognito
  n_RAG_API__FastAPI_0_115_ -->|"TCP/TLS"| n_PostgreSQL_16___pgvector
  n_RAG_API__FastAPI_0_115_ -->|"HTTPS"| n_Meilisearch
  n_RAG_API__FastAPI_0_115_ -->|"TCP/TLS"| n_Redis_7
  n_RAG_API__FastAPI_0_115_ -->|"HTTPS"| n_Amazon_Bedrock
  n_RAG_API__FastAPI_0_115_ -->|"HTTPS"| n_AWS_Cognito
  n_Indexing_Worker__FastAPI_0_115_codebase_ -->|"TCP/TLS"| n_Redis_7
  n_Indexing_Worker__FastAPI_0_115_codebase_ -->|"HTTPS"| n_Document_Bucket
  n_Indexing_Worker__FastAPI_0_115_codebase_ -->|"HTTPS"| n_Amazon_Bedrock
  n_Indexing_Worker__FastAPI_0_115_codebase_ -->|"TCP/TLS"| n_PostgreSQL_16___pgvector
  n_Indexing_Worker__FastAPI_0_115_codebase_ -->|"HTTPS"| n_Meilisearch
```
<!-- sdlc:auto:end topology -->
