# 🛠️ API Architecture


## Table of contents

 <!--TODO: change full paragraph-->
## 📋 About

This document describes the internal structure of the whiteboard editor. The editor is the most complex part of the system, as it has many different features, supports many types of nodes, and operates with complex geometric calculations and event processing.

### ⚓ Key principles

* **Single Source of Truth:** Root state's are the only source of truth. The visual representation is just a derivative of this data.
* **State independence:** Different features and modes of operation should not know about each other.
* **Clean components:** Components should not be aware of the features they can potentially implement.
* **Decoration:** Extra features should be implemented without changing the basic functionality of the components.
* **Blind client code:** The client code does not need to know what type of node it is working with.
* **Polymorphism:** Differences in the behavior of nodes are provided by strategy classes corresponding to the node type.
* **Consistency:** The nodes of the board should not be in an inconsistent state (when arrow is binded to a non-existent node).

### ⌚ When to read this doc ❓

* when you want to add new node type
* when you want to add new view state
* when you need to change node feature performing behavior
* when you want to add some extra functionality (like realtime multi-users interactions)

## Core

### Microservices

API contains such microservices:

* `gateway` - API-gateway. Roles:
  * `gRPC` - sender
  * broker - publisher
* `boards` service - process boards and board nodes. Roles:
  * `gRPC` - receiver
  * broker - publisher and consumer
* `media` service - works with static images and S3. Roles:
  * `gRPC` - receiver 
* `mails` worker - sends emails. Roles:
  * broker - consumer

### Modules design

The absolute majority of apps modules contains this elements (some elements can be omitted in certain modules):

* `handlers/` - CQRS handlers
* `entities/` - stored entities
* `schemas/` - stored `MongoDB` entities
* `dto/` - dto's used in module
* `lib/` - constants for caching, DI and other
* `swagger/` - contains all code for `Swagger` docs
* `*.controller.ts` or `controllers/` - module controllers. In modules with multiple traffic types  (`HTTP`, `gRPC` and broker) different controllers process different traffic types.
* `*.service.ts` - service class that receive data from controller and push this data to corresponding bus (query or command)
* `*.helper.ts` - class contains reusable logic for data access
* `*.module.ts` - module class

## Broker

### How messages deduplication is implemented?

### How `Transactional Outbox` is pattern implemented?
<!--TODO: implement-->

### How message acknowledgements are implemented?

<!--TODO: implement-->

## Lib

### How `Swaagger` is implemented?

`Swagger` functionality is designed such a way as to overlap with business logic as little as possible.

`Swagger` functionality is implemented such way:

1. Create entity api type (this type composes all fields used by dtos).

```typescript
import type { Board } from "@lib/boards";
import { ApiProperty } from "@nestjs/swagger";

export class BoardApiType implements Board {
    @ApiProperty({ type: String, format: "uuid", description: "Unique board id" })
    public id: string;

    @ApiProperty({ type: String, example: "My board", description: "Board title" })
    public title: string;

    @ApiProperty({ type: String, nullable: true, description: "Board description" })
    public description?: string | undefined;

    @ApiProperty({ type: String, format: "uri", description: "Board icon link" })
    public icon: string;

    @ApiProperty({ type: String, format: "uuid", description: "Board creator id" })
    public creatorId: string;

    @ApiProperty({ type: Date, format: "date", description: "Board creation date" })
    public createdAt: Date;

    @ApiProperty({ type: Date, nullable: true, format: "date", description: "Last board update date" })
    public updatedAt?: Date | undefined;
}
```

2. Create dtos api types by applying `@nestjs/swagger` mapped types to entity api types.

```typescript
import type { Board, CreateBoardDto, UpdateBoardDto } from "@lib/boards";
import { PartialType, PickType } from "@nestjs/swagger";
import { BoardApiType } from "./entities.swagger";

export class CreateBoardDtoApiType extends PickType(BoardApiType, ["title", "icon"]) implements CreateBoardDto {}

export class CreateBoardResponseApiType extends BoardApiType implements Board {}

export class UpdateBoardDtoApiType extends PartialType(PickType(BoardApiType, ["title", "description", "icon"])) implements UpdateBoardDto {}
```

3. Create decorator for controller.

Use `createControllerSwaggerDecorator` function from `@api/common` package to create controller decorator for `Swagger` info.

```typescript
import { createControllerSwaggerDecorator } from "@api/common";
import { HttpStatus } from "@nestjs/common";
import { SwaggerTags } from "src/lib/swagger/swagger.constants";
import { CreateBoardDtoApiType, CreateBoardResponseApiType, UpdateBoardDtoApiType } from "./dtos.swagger";

export const BoardsControllerApiType = createControllerSwaggerDecorator({
    tag: SwaggerTags.boards.children.management.name,
    auth: true,
    methods: [
        {
            name: "create",
            operation: {
                summary: "Create new board"
            },
            body: {
                type: CreateBoardDtoApiType
            },
            response: [
                {
                    status: HttpStatus.OK,
                    description: "Board created successfully",
                    type: CreateBoardResponseApiType
                }
            ]
        },
        // Other methods ...
    ]
});
```

4. Add created decorator to controller class.


```typescript
// Other decorators
@BoardsControllerApiType()
export class BoardsController {
    // Controller implementation
}
```

### How caching is implemented?

Caching is implemented with `@api/cache` package. This package is designed such way as to move as many caching logic as possible to the middleware.

This package export such members:

* `CacheModule` - module class
* `CacheService` - service for domain access to cache. This service also provides way to get native `Redis` client instance
* `Cache` - decorator that caches the result of corresponding method. If data already is in cache - request will not be handled
* `InvalidateCache` - decorator that invalidates cache records on successful request handling
* `ManualCache` - do not perform any actions. It is only used for signalization about caching without `Cache` and `InvalidateCache` decorators

### How tests are implemented?

> [!Note] 
>
> API tests are implemented with `bun` runtime.
> `Bun` has own test runner the syntax of wich is similar to `jest` and `vitest`.
>
> This approach gives a significant increase in the tests run rate.
> Testing libraries like `jest` and `vitest` can not boast of such speed.

The are also reusable mock-creator functions exported by `@api/common`, `@api/cache` and `@contracts/broker` classes:

* `createRepositoryMock` - creates mock of `TypeORM` repository
* `createMongooseModelMock` - creates mock of `Mongoose` model
* `createCacheServiceMock` - creates mock of `CacheService class` from `@api/cache` package
* `clearMock` - function that clears mock data
* etc.

Local mock-creator functions are declared in corresponding test folders. 
 
### How validation is implemented?

Validation is implemented with using of `zod` schema validation library.

`@lib/*` packages exports schemas to different domain entities. 

`@api/common` exports `Validation` and `QueryValidation` decorators that uses custom `ZodValidationPipe` under the hood to validate incoming request body and query arguments appropriately.
