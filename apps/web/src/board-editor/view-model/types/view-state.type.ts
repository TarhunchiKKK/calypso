import type { ArrowBindingViewState } from "../variants/arrow-binding/view-state";
import type { DraggingViewState } from "../variants/dragging/view-state";
import type { DrawingViewState } from "../variants/drawing/view-state";
import type { EditingViewState } from "../variants/editing/view-state";
import type { IdleViewState } from "../variants/idle/view-state";
import type { MediaSelectionViewState } from "../variants/media-selection/view-state";
import type { NodeCreationViewState } from "../variants/node-creation/view-state";
import type { NodesContextMenuViewState } from "../variants/nodes-context-menu/view-state";
import type { ResizingViewState } from "../variants/resizing/view-state";
import type { SelectionViewState } from "../variants/selection/view-state";
import type { SelectionWindowViewState } from "../variants/selection-window/view-state";
import type { ShapeSelectionViewState } from "../variants/shape-selection/view-state";
import type { StylingViewState } from "../variants/styling/view-state";

export type ViewState =
    | IdleViewState
    | NodeCreationViewState
    | ArrowBindingViewState
    | DrawingViewState
    | ShapeSelectionViewState
    | MediaSelectionViewState
    | SelectionViewState
    | SelectionWindowViewState
    | DraggingViewState
    | ResizingViewState
    | EditingViewState
    | StylingViewState
    | NodesContextMenuViewState;

type SingleNodeViewStates = Extract<ViewState, ArrowBindingViewState | ResizingViewState | EditingViewState>;

type MultipleNodesViewStates = Extract<
    ViewState,
    SelectionViewState | SelectionWindowViewState | DraggingViewState | StylingViewState | NodesContextMenuViewState
>;

type ViewStatesWithStartPoint = Extract<ViewState, SelectionWindowViewState | DraggingViewState>;

export const ViewStateTypeGuards = {
    singleNode: (viewState: ViewState): viewState is SingleNodeViewStates => {
        const key: keyof SingleNodeViewStates = "nodeId";

        return key in viewState;
    },
    multipleNodes: (viewState: ViewState): viewState is MultipleNodesViewStates => {
        const key: keyof MultipleNodesViewStates = "nodeIds";

        return key in viewState;
    },
    withStartPoint: (viewState: ViewState): viewState is ViewStatesWithStartPoint => {
        const key: keyof ViewStatesWithStartPoint = "startPoint";

        return key in viewState;
    }
};
