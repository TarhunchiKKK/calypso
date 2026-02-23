import { useState } from "react";
import type { OmitFields } from "@/shared/lib/typescript";
import { applyDecorators } from "./decorators/apply-decorators.facade";
import type { ViewModel, ViewModelParams, ViewState } from "./types";
import { useDraggingViewModel } from "./variants/dragging/view-model";
import { useEditingViewModel } from "./variants/editing/view-model";
import { switchToIdle } from "./variants/idle/switcher";
import { useIdleViewModel } from "./variants/idle/view-model";
import { useResizingViewModel } from "./variants/resizing/view-model";
import { useSelectionViewModel } from "./variants/selection/view-model";
import { useSelectionWindowViewModel } from "./variants/selection-window/view-model";
import { useShapeSelectionViewModel } from "./variants/shape-selection/view-model";
import { useShapesCreationViewModel } from "./variants/shapes-creation/view-model";
import { useStickersCreationViewModel } from "./variants/stickers-creation/view-model";
import { useStylingViewModel } from "./variants/styling/view-model";

export function useViewModel(params: OmitFields<ViewModelParams, "setViewState">): ViewModel {
    const [viewState, setViewState] = useState<ViewState>(() => switchToIdle());

    const newParams = {
        ...params,
        setViewState
    };

    // REFACTOR: do this with view model creators record
    const idleViewModel = useIdleViewModel(newParams);
    const stickersCreationViewModel = useStickersCreationViewModel(newParams);
    const shapeSelectionViewModel = useShapeSelectionViewModel(newParams);
    const shapesCreationViewModel = useShapesCreationViewModel(newParams);
    const selectionViewModel = useSelectionViewModel(newParams);
    const selectionWindowViewModel = useSelectionWindowViewModel(newParams);
    const draggingViewModel = useDraggingViewModel(newParams);
    const resizingVewModel = useResizingViewModel(newParams);
    const editingViewModel = useEditingViewModel(newParams);
    const stylingViewModel = useStylingViewModel(newParams);

    let viewModel: OmitFields<ViewModel, "actions">;
    switch (viewState.type) {
        case "idle":
            viewModel = idleViewModel(viewState);
            break;
        case "stickers-creation":
            viewModel = stickersCreationViewModel();
            break;
        case "shape-selection":
            viewModel = shapeSelectionViewModel(viewState);
            break;
        case "shapes-creation":
            viewModel = shapesCreationViewModel(viewState);
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
        default:
            throw new Error("Unknown view state");
    }

    console.log(viewState.type);

    return applyDecorators(viewModel, viewState, newParams);
}
