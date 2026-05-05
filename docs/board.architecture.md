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
* `NoteNode` - text node with more rich formatting abilities in compare to text node (texxt formatting, lists, headers, etc.)
* `DrawingNode` - brush drawing

You can see this types declarations in `../packages/boards-common/src/nodes/variants.types.ts` file.

## How are different Working modes implemented ❓

The working modes are implemented using the "State" pattern.

Every working mode (nodes creation, dragging, editing, etc.) represents have appropriate view model and have appropriate view state object. 

When user switches to different working mode appropriate view model will be selected in `useViewModel` hook.

You can see them in `apps/web/board-editor/view-model/variants` folder.

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
