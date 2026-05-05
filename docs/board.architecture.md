# Board Editor Architecture

## About

<!-- Write -->

## Node types

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

## How are different working modes implemented ❓



### View models

The working modes are implemented using the "State" pattern.

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
* **media selection** - used before node creation view model to choose where to locate media (locally or presets)
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

Before view model switching some middleware functions are performed. It is necessary to handle some 'incorrect' view model switches.

Examples:

* `LockedNodesGuard` - used to protect view model to switch to any 'writable' view models (editing, dragging, styling, etc.) with blocked nodes 

This actions appears in `apps/web/src/board-editor/view-model/hooks/use-view-state-mediators.hook.ts` file.

### View model additional elements

`ViewModel` type has `additionalElements` property.

Some view models have ui it own elements to render (for example `StylingPanel` in styling view model). 

This field is used to render such elements on board.

View models with additional elements:

* **styling**
* **selection window**
* **nodes context menu** 
* **shape selection**
* **media selection**

## How nodes management implemented ❓
