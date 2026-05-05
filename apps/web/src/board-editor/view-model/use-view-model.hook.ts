import type { OmitFields } from "@repo/common";
import { useEffect } from "react";
import { ARROW_RELATIVE_POSITIONS_MIDDLEWARE_KEY, ArrowsRelativePositionsMiddleware } from "../modules/arrows-resolution";
import { type DecoratableViewModel, useViewModelDecorators } from "./decorators";
import { useViewStateMediator } from "./hooks/use-view-state-mediator.hook";
import { LOCKED_NODES_GUARD_KEY, LockedNodesGuard } from "./middleware/locked-node.guard";
import type { ViewModel, ViewModelParams } from "./types";
import { useArrowBindingViewModel } from "./variants/arrow-binding/view-model";
import { useDraggingViewModel } from "./variants/dragging/view-model";
import { useEditingViewModel } from "./variants/editing/view-model";
import { switchToIdle } from "./variants/idle/switcher";
import { useIdleViewModel } from "./variants/idle/view-model";
import { useMediaSelectionViewModel } from "./variants/media-selection/view-model";
import { useNodeCreationViewModel } from "./variants/node-creation/view-model";
import { useNodesContextMenuViewModel } from "./variants/nodes-context-menu/view-model";
import { useResizingViewModel } from "./variants/resizing/view-model";
import { useSelectionViewModel } from "./variants/selection/view-model";
import { useSelectionWindowViewModel } from "./variants/selection-window/view-model";
import { useShapeSelectionViewModel } from "./variants/shape-selection/view-model";
import { useStylingViewModel } from "./variants/styling/view-model";

/**
 * This hook builds different view model instances and returns appropriate instance.
 *
 * @param params Params for view model building.
 * @returns View model instance.
 */
export function useViewModel(params: OmitFields<ViewModelParams, "setViewState">): ViewModel {
    const { viewState, setViewState, ...viewStateMiddleware } = useViewStateMediator(params.nodesModel, () => switchToIdle());

    const newParams = {
        ...params,
        setViewState
    };

    useEffect(() => {
        viewStateMiddleware.guards.set(LOCKED_NODES_GUARD_KEY, LockedNodesGuard);
    }, [viewStateMiddleware.guards.set]);

    useEffect(() => {
        params.nodesModel.service.middleware.set(ARROW_RELATIVE_POSITIONS_MIDDLEWARE_KEY, ArrowsRelativePositionsMiddleware);
    }, [params.nodesModel.service.middleware.set]);

    const idleViewModel = useIdleViewModel(newParams);
    const nodeCreation = useNodeCreationViewModel(newParams);
    const arrowBindingViewModel = useArrowBindingViewModel(newParams);
    const shapeSelectionViewModel = useShapeSelectionViewModel(newParams);
    const mediaSelectionViewModel = useMediaSelectionViewModel(newParams);
    const selectionViewModel = useSelectionViewModel(newParams);
    const selectionWindowViewModel = useSelectionWindowViewModel(newParams);
    const draggingViewModel = useDraggingViewModel(newParams);
    const resizingVewModel = useResizingViewModel(newParams);
    const editingViewModel = useEditingViewModel(newParams);
    const stylingViewModel = useStylingViewModel(newParams);
    const nodesContextMenuViewModel = useNodesContextMenuViewModel(newParams);

    let viewModel: DecoratableViewModel;
    switch (viewState.type) {
        case "idle":
            viewModel = idleViewModel(viewState);
            break;
        case "node-creation":
            viewModel = nodeCreation(viewState);
            break;
        case "arrow-binding":
            viewModel = arrowBindingViewModel(viewState);
            break;
        case "shape-selection":
            viewModel = shapeSelectionViewModel(viewState);
            break;
        case "media-selection":
            viewModel = mediaSelectionViewModel(viewState);
            break;
        case "selection":
            viewModel = selectionViewModel(viewState);
            break;
        case "selection-window":
            viewModel = selectionWindowViewModel(viewState);
            break;
        case "dragging":
            viewModel = draggingViewModel(viewState);
            break;
        case "resizing":
            viewModel = resizingVewModel(viewState);
            break;
        case "editing":
            viewModel = editingViewModel(viewState);
            break;
        case "styling":
            viewModel = stylingViewModel(viewState);
            break;
        case "nodes-context-menu":
            viewModel = nodesContextMenuViewModel(viewState);
            break;
        default:
            throw new Error(`useViewModel: Unknown view state - ${viewState}`);
    }

    // console.log(viewState.type);

    return useViewModelDecorators(viewModel, viewState, newParams);
}
