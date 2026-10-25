# Data Model

<!-- sdlc:auto:start entities -->
### users

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| cognito_sub | varchar | False | — | False |
| email | varchar | False | — | False |
| created_at | timestamptz | False | — | False |

### conversations

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| user_id | uuid | False | users.id | False |
| title | varchar | False | — | True |
| created_at | timestamptz | False | — | False |
| updated_at | timestamptz | False | — | False |

### messages

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| conversation_id | uuid | False | conversations.id | False |
| role | varchar | False | — | False |
| content | text | False | — | False |
| created_at | timestamptz | False | — | False |

### citations

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| message_id | uuid | False | messages.id | False |
| document_id | uuid | False | documents.id | False |
| chunk_id | uuid | False | chunks.id | True |
| filename | varchar | False | — | False |
| location | varchar | False | — | True |

### documents

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| s3_key | varchar | False | — | False |
| filename | varchar | False | — | False |
| file_type | varchar | False | — | False |
| status | varchar | False | — | False |
| error | text | False | — | True |
| indexed_at | timestamptz | False | — | True |
| last_run_id | uuid | False | indexing_runs.id | True |

### chunks

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| document_id | uuid | False | documents.id | False |
| chunk_index | integer | False | — | False |
| content | text | False | — | False |
| metadata | jsonb | False | — | True |
| embedding | vector | False | — | True |
| meili_id | varchar | False | — | True |

### indexing_runs

| Field | Type | PK | FK | Nullable |
|---|---|---|---|---|
| id | uuid | True | — | False |
| status | varchar | False | — | False |
| files_total | integer | False | — | True |
| files_indexed | integer | False | — | True |
| files_failed | integer | False | — | True |
| started_at | timestamptz | False | — | False |
| completed_at | timestamptz | False | — | True |
<!-- sdlc:auto:end entities -->

<!-- sdlc:auto:start relationships -->
| Source | Target | Type |
|---|---|---|
| users | conversations | one-to-many |
| conversations | messages | one-to-many |
| messages | citations | one-to-many |
| documents | chunks | one-to-many |
| documents | citations | one-to-many |
| chunks | citations | one-to-many |
| indexing_runs | documents | one-to-many |
<!-- sdlc:auto:end relationships -->

<!-- sdlc:auto:start er-diagram -->
```mermaid
erDiagram
  users {
    uuid id PK
    varchar cognito_sub
    varchar email
    timestamptz created_at
  }
  conversations {
    uuid id PK
    uuid user_id FK
    varchar title
    timestamptz created_at
    timestamptz updated_at
  }
  messages {
    uuid id PK
    uuid conversation_id FK
    varchar role
    text content
    timestamptz created_at
  }
  citations {
    uuid id PK
    uuid message_id FK
    uuid document_id FK
    uuid chunk_id FK
    varchar filename
    varchar location
  }
  documents {
    uuid id PK
    varchar s3_key
    varchar filename
    varchar file_type
    varchar status
    text error
    timestamptz indexed_at
    uuid last_run_id FK
  }
  chunks {
    uuid id PK
    uuid document_id FK
    integer chunk_index
    text content
    jsonb metadata
    vector embedding
    varchar meili_id
  }
  indexing_runs {
    uuid id PK
    varchar status
    integer files_total
    integer files_indexed
    integer files_failed
    timestamptz started_at
    timestamptz completed_at
  }
  users ||--o{ conversations : "one-to-many"
  conversations ||--o{ messages : "one-to-many"
  messages ||--o{ citations : "one-to-many"
  documents ||--o{ chunks : "one-to-many"
  documents ||--o{ citations : "one-to-many"
  chunks ||--o{ citations : "one-to-many"
  indexing_runs ||--o{ documents : "one-to-many"
```
<!-- sdlc:auto:end er-diagram -->
