import type { DraggingViewState } from "../variants/dragging/view-state";
import type { EditingViewState } from "../variants/editing/view-state";
import type { IdleViewState } from "../variants/idle/view-state";
import type { ResizingViewState } from "../variants/resizing/view-state";
import type { SelectionViewState } from "../variants/selection/view-state";
import type { SelectionWindowViewState } from "../variants/selection-window/view-state";
import type { ShapeSelectionViewState } from "../variants/shape-selection/view-state";
import type { ShapesViewState } from "../variants/shapes/view-state";
import type { StickersViewState } from "../variants/stickers/view-state";
import type { StylingViewState } from "../variants/styling/view-state";

/**
 * Represents the state of the view model, acting as a state machine for the board editor's UI.
 * The application behaves differently based on the current `ViewState`.
 * It can be one of the following:
 * - `Idle`: The default state, where no specific interaction is in progress.
 * - `Stickers`: The user is interacting with the sticker panel.
 * - `Selection`: One or more nodes are selected.
 * - `SelectionWindow`: The user is drawing a selection window.
 * - `Dragging`: The user is dragging one or more nodes.
 * - `Resizing`: The user is resizing a node.
 * - `Editing`: The user is editing the content of a node.
 */
export type ViewState =
    | IdleViewState
    | StickersViewState
    | ShapeSelectionViewState
    | ShapesViewState
    | SelectionViewState
    | SelectionWindowViewState
    | DraggingViewState
    | ResizingViewState
    | EditingViewState
    | StylingViewState;
