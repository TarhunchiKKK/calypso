# 🛠️ Project Architecture
 
## Table of contents

- [🛠️ Project Architecture](#️-project-architecture)
  - [Table of contents](#table-of-contents)
  - [Apps](#apps)
  - [Project Structure](#project-structure)

## Apps

* Learn about [API Architecture](./api/architecture.md)
* Learn about [Board Editor Architecture](./board-editor/architecture.md)

## Project Structure

* `apps/` - contains applications that preforms business-logic.
  * `gateway` - API-gateway app. Redirects requests to corresponding microservice and performs authorization business-logic
  * `boards` service - 
  * `media` service -
  * `mails` worker - 
  * `web` - 
* `assets/` - media presets
* `docker/` - `docker-compose.yaml` files (merges when `docker compose up` command is running)
* `packages/` - reusable functionality
  * `api/` - reusable functionality for API applications
    * `cache` - functionality to work with `Redis`
    * `common` - common api modules (validation, swagger, mocks, etc.)
  * `config/` - configuration reusable between apps and packages
    * `typescript` - reusable TypeScript configuration (used by all apps and packages)
  * `contracts/` - communication rules of applications (web-gateway, gateway-service/worker)
    * `broker` - rules of `RabbitMQ` communication between API apps
    * `grpc` - rules of `gRPC` communication between API apps
    * `http` - http client generated from `Swagger` info to setup communication between `web` and `gateway` apps 
  * `lib/` - reusable types and `zod` schemas
    * `auth` - reusable authorization functionality types and `zod` schemas
    * `boards` - reusable boards functionality types and `zod` schemas
    * `common` - common types and `zod` schemas (`Id`, etc.)
    * `media` - reusable media functionality types and `zod` schemas
    * `projects` - base types and `zod` schemas for `boards` package
* `scripts/` - scripts that simplifies work with code
  * `load-env` - loads variables from `.env` file to corresponding apps
  * `refresh-env-example` - copy variables from `.env` to `.env.example` (clears private variables)
  * `bun-test-setup.ts` - setup for tests that are running with `Bun` runtime