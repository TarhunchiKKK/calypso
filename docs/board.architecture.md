# 🛠️ Board Editor Architecture

## Table of contents
- [🛠️ Board Editor Architecture](#️-board-editor-architecture)
  - [Table of contents](#table-of-contents)
  - [📋 About](#-about)
    - [⚓ Key principles](#-key-principles)
    - [⌚ When to read this doc ❓](#-when-to-read-this-doc-)
  - [Core](#core)
    - [Node types](#node-types)
    - [Core board editor UI components](#core-board-editor-ui-components)
  - [How are different working modes implemented ❓](#how-are-different-working-modes-implemented-)
    - [View models](#view-models)
    - [Core types](#core-types)
    - [View model decorators](#view-model-decorators)
    - [View model switching](#view-model-switching)
    - [View model additional elements](#view-model-additional-elements)
  - [How is nodes management implemented ❓](#how-is-nodes-management-implemented-)
    - [`useNodesService` hook](#usenodesservice-hook)
    - [How is nodes api integrated ❓](#how-is-nodes-api-integrated-)
    - [How are node CRUD-operations cancellation implemented ❓](#how-are-node-crud-operations-cancellation-implemented-)
  - [How are specific view models implemented ❓](#how-are-specific-view-models-implemented-)
    - [Node decorators and strategies](#node-decorators-and-strategies)
    - [How nodes creation view model works ❓](#how-nodes-creation-view-model-works-)
    - [How is nodes locking works ❓](#how-is-nodes-locking-works-)
    - [How is arrows resolution works ❓](#how-is-arrows-resolution-works-)
      - [`RelativePoint` type](#relativepoint-type)
      - [Resolving arrow absolute positions](#resolving-arrow-absolute-positions)
      - [Arrows unbinding](#arrows-unbinding)
  - [Other features](#other-features)
    - [Mouse events handling](#mouse-events-handling)


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

### Node types

* `StickerNode` - simple sticker (like in Miro)
* `ArrowNode` - arrow that can be binded to other nodes
* `TextNode` - node with basic text formatting functionality (bold/italic/underlined text)
* `ShapeNode` - node that represents a geometric shape. Available shapes:
  * circle
  * rectangle
  * triangle
  * diamond
  * star
  * hexagon
* `MediaNode` - node with picture inside
* `NoteNode` - text node with more rich formatting abilities in compare to text node (text formatting, lists, headers, etc.)
* `DrawingNode` - brush drawing

You can see this types declarations in `packages/boards-common/src/nodes/variants.types.ts` file.

### Core board editor UI components

In `apps/web/src/board-editor/ui` you can see core board editor components.

* `Layout` - root board editor element. It is primary used for hot keys handling
* `Dots` - component used to render dots in board editor background
* `Canvas` - component that wraps nodes. It is used for apply board shift and zoom (with `useLayoutDimensions` hook)
* `Overlay` - component that represents space around the nodes. Used for handling clicks outside of nodes
* `ActionsBar` - represents left-side bar with actions (nodes creation, exchange buffer, cancellation)

## How are different working modes implemented ❓

### View models

The working modes are implemented using the **State** pattern.

Every working mode (nodes creation, dragging, editing, etc.) represents have appropriate view model and have appropriate view state object. 

When user switches to different working mode appropriate view model will be selected in `useViewModel` hook.

You can see them in `apps/web/src/board-editor/view-model/variants` folder.

View models:

* **idle** - default view model (no actions)
* **node creation** - used to create nodes of any types
* **selection** - used to select multiple nodes. When node selected it gets a blue outline
* **selection window** - used to select multiple nodes using `SelectionWindow` component
* **dragging** - used to drag node/nodes to new position
* **resizing** - used to resize single node
* **editing** - used to edit node text (some nodes not support it)
* **shape selection** - used before node creation view model to choose shape variant (circler, stars, diamonds, etc.) to create
* **media selection** - used before node creation view model to choose from where to load media (locally or presets)
* **arrow binding** - used to bind arrow head/tail to any node
* **styling** - used to style multiple nodes with `StylingPanel` component (like styling panel in Miro) 
* **nodes context menu** - used to perform common operations with nodes (Copy/Paste, locking, etc.)

### Core types

In `apps/web/src/board-editor/view-model/types` folder you can see core view model types.

* `ViewModelParams` - this object will be passed to all view model hooks
* `ViewModel` - represents all data that needed for rendering
* `ViewState` - union of all different view states (not needed in `ViewModelParams`)

### View model decorators

All view model have shared functionality that is moved to a separate hook.

You can see all view model decorators in `apps/web/src/board-editor/view-model/decorators` folder. Here you also can see `useViewModelDecorators` hook that composes all decorators and applies them to view model.

Decorators:

* `useActionsDecorator` - used to add buttons to `ActionsBar` component and determine active button
* `useHotKeysDecorator` - adds key handlers to applications (cancellation, exchange buffer and other)
* `useLastClickDecorator` - used to track last click point (is primary used to determine paste position when copy/paste nodes)
* `useLayoutDimensionsDecorator` - used to handle board shifting and zooming

### View model switching

Before view model switching some middleware functions are performed. It is necessary to handle some "incorrect" view model switches.

Examples:

* `LockedNodesGuard` - used to protect view model to switch to any 'writable' view models (**editing**, **dragging**, **styling**, etc.) with blocked nodes 

This actions appears in `apps/web/src/board-editor/view-model/hooks/use-view-state-mediators.hook.ts` file.

### View model additional elements

`ViewModel` type has `additionalElements` property.

Some view models have ui it own elements to render (for example `StylingPanel` in **styling** view model). 

This field is used to render such elements on board.

View models with additional elements:

* **styling**
* **selection window**
* **nodes context menu** 
* **shape selection**
* **media selection**

## How is nodes management implemented ❓

### `useNodesService` hook

In `apps/web/src/entities/nodes/model/use-nodes-service.hook.ts` you can see `useNodesService` and `useNodesServiceMiddleware` hooks.

`useNodesService` hook performs CRUD-operations with nodes.

`useNodesServiceMiddleware` hook handles middleware functions before 'writing' nodes CRUD-operations (creation, deletion, updating). This middleware functions handles specific nodes behavior (for example arrow unbinding when related node deleted).

### How is nodes api integrated ❓

<!--DOCS-->

### How are node CRUD-operations cancellation implemented ❓

CRUD-operations cancellation is implemented like nodes api. 

In `apps/web/src/board-editor/modules/cancellation` folder you can see `useCancellationDecorator` hook. This hook stores changes in form of undo/redo functions.

This hook wraps nodes service object instance and decorates it methods with saving undo/redo functions. After this hook returns decorated nodes service object.

## How are specific view models implemented ❓

### Node decorators and strategies

View models like dragging, resizing, editing and other are implemented with **Decorator** and **Strategy** patterns.

Node decorator represents core node manipulation functionality to perform view model actions.

Node decorators have strategy instance that contains individual view model logic for node depends on it's type.

Strategies:

* **bindable** - strategies for nodes that can be relative for arrows
* **binding** - strategies for binding arrows to other nodes
* **dragging** - strategies that specifies how to move nodes
* **editing** - strategies that specifies how to edit node text (some nodes don't support this)
* **locking** - strategies that specifies how to render locked nodes
* **resizable** - strategies that specifies how to render nodes that can be resized
* **resizing** - strategies that specifies how to resize nodes (arrows don't support this)
* **selection** - strategies that specifies how to render selected nodes (blue outline)

### How nodes creation view model works ❓

In `apps/web/src/board-editor/view-model/variants/node-creation` folder you can see `useNodeCreationViewModel` hook.

This hook implements creating nodes of any types.

The process of creating nodes of any type have common code. Only specific actions differs.

In this folder you also an find `HandlersRecord` object that contains this different specific actions for all node types.

So `useNodeCreationViewModel` hook performs this specific actions and process of different type nodes creation become unified.

### How is nodes locking works ❓

Nodes locking is implemented several ways:

1. Using `CheckLocked` [TypeScript](https://www.typescriptlang.org/) decorator on `NodeDecoratorsFactory` methods. This prevents from creating node decorators for locked nodes.
2. Using `LockedNodesGuard` as view state middleware. This prevents from switching to some view models (like **editing**) for locked node.
3. Using `NodeLockingDecorator` class that specifies how to render locked node.

### How is arrows resolution works ❓

#### `RelativePoint` type

`ArrowNode` type have `start` and `end` fields with `RelativePoint` type. `RelativePoint.relatedTo` field represents relative node.

`RelativePoint` type behavior:

1. If `relatedTo` is not defined -- is is a simple point relative to board.
2. Otherwise `x` and `y` fields represents percents of related node width and height appropriately.

#### Resolving arrow absolute positions

Before rendering we should map `RelativePoint` coordinate to absolute coordinates.

For this purpose `resolveArrowAbsolutePosition` function is used. You can see this function in `apps/web/src/board-editor/modules/arrows-resolution` folder.

This function executes before render view model building and therefore arrows renders with absolute coordinates (related to board).

#### Arrows unbinding

Imagine situation:
1. You have arrow binded to another node (for example sticker).
2. You remove sticker.
3. After this you should translate arrow relative coordinates to absolute. If you don't perform this arrow absolute position will not be resolved after.

For handing this case `ArrowsRelativePositionsMiddleware` function is used. This function is registered as nodes service middleware.

You can see this function in `apps/web/src/board-editor/modules/arrows-resolution` folder.

## Other features

### Mouse events handling

In `apps/web/src/shared/react` you can see `MouseEventsMediator` class.

This class is used for:
1. Handling double clicks. Native double click handling methods are not suitable.
2. Handling long mouse press. It is useful when you need to distinguish mouse down and click events.
3. Handling right mouse key click. Native handling method is not works because `Layout` component prevents `onContextMenu` event handler.

This class uses timers and delays to determine what event occurred: mouse down, click and double click.

> **Note:** For determining click and double click you should also use `onMouseUp` handler from `MouseEventsMediator` class. Otherwise you could not determine mouse up that is flag of click.
