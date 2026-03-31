import type { ArrowBindingViewState } from "../variants/arrow-binding/view-state";
import type { ArrowCreatingEndViewState } from "../variants/arrow-creating-end/view-state";
import type { ArrowCreatingStartViewState } from "../variants/arrow-creating-start/view-state";
import type { DraggingViewState } from "../variants/dragging/view-state";
import type { EditingViewState } from "../variants/editing/view-state";
import type { IdleViewState } from "../variants/idle/view-state";
import type { NodesContextMenuViewState } from "../variants/nodes-context-menu/view-state";
import type { ResizingViewState } from "../variants/resizing/view-state";
import type { SelectionViewState } from "../variants/selection/view-state";
import type { SelectionWindowViewState } from "../variants/selection-window/view-state";
import type { ShapeSelectionViewState } from "../variants/shape-selection/view-state";
import type { ShapesCreationViewState } from "../variants/shapes-creation/view-state";
import type { StickersCreationViewState } from "../variants/stickers-creation/view-state";
import type { StylingViewState } from "../variants/styling/view-state";

export type ViewState =
    | IdleViewState
    | StickersCreationViewState
    | ArrowCreatingStartViewState
    | ArrowCreatingEndViewState
    | ArrowBindingViewState
    | ShapeSelectionViewState
    | ShapesCreationViewState
    | SelectionViewState
    | SelectionWindowViewState
    | DraggingViewState
    | ResizingViewState
    | EditingViewState
    | StylingViewState
    | NodesContextMenuViewState;
