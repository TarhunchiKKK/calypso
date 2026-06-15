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

The absolute majority of apps modules contains this elements:

* `handlers/` - CQRS handlers
* `entities/` - stored entities
* `schemas/` - stored `MongoDB` entities
* `dto/` - dto's used in module
* `lib/` - constants for caching, DI and other
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

### How Swaagger is implemented?

### How caching is implemented?

### How tests are implemented?

### How validation is implemented?
