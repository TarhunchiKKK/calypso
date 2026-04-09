import type { OmitFields } from "@repo/common";
import { useEffect, useState } from "react";
import { ArrowsRelativePositionsMiddleware } from "../modules/arrows-resolution";
import { applyDecorators } from "./decorators/apply-decorators.facade";
import type { ViewModel, ViewModelParams, ViewState } from "./types";
import type { DecoratableViewModel } from "./types/view-model.types";
import { useArrowBindingViewModel } from "./variants/arrow-binding/view-model";
import { useDraggingViewModel } from "./variants/dragging/view-model";
import { useEditingViewModel } from "./variants/editing/view-model";
import { switchToIdle } from "./variants/idle/switcher";
import { useIdleViewModel } from "./variants/idle/view-model";
import { useNodeCreationViewModel } from "./variants/node-creation/view-model";
import { useNodesContextMenuViewModel } from "./variants/nodes-context-menu/view-model";
import { useResizingViewModel } from "./variants/resizing/view-model";
import { useSelectionViewModel } from "./variants/selection/view-model";
import { useSelectionWindowViewModel } from "./variants/selection-window/view-model";
import { useShapeSelectionViewModel } from "./variants/shape-selection/view-model";
import { useStylingViewModel } from "./variants/styling/view-model";

export function useViewModel(params: OmitFields<ViewModelParams, "setViewState">): ViewModel {
    const [viewState, setViewState] = useState<ViewState>(() => switchToIdle());

    const newParams = {
        ...params,
        setViewState
    };

    useEffect(() => {
        params.nodesModel.service.middleware.add(ArrowsRelativePositionsMiddleware);
    }, [params.nodesModel.service.middleware.add]);

    const idleViewModel = useIdleViewModel(newParams);
    const nodeCreation = useNodeCreationViewModel(newParams);
    const arrowBindingViewModel = useArrowBindingViewModel(newParams);
    const shapeSelectionViewModel = useShapeSelectionViewModel(newParams);
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

    console.log(viewState.type);

    return applyDecorators(viewModel, viewState, newParams);
}
