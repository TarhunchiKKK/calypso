import { useState } from "react";
import { ViewModel, ViewModelParams, ViewState } from "./types";
import { switchToIdle, useIdleViewModel } from "./variants/idle";
import { useStickersViewModel } from "./variants/stickers";
import { OmitFields } from "@/shared/lib/typescript";
import { useSelectionViewModel } from "./variants/selection";
import { useDraggingViewModel } from "./variants/dragging";
import { applyDecorators } from "./decorators/apply-decorators";

export function useViewModel(params: OmitFields<ViewModelParams, "setViewState">) {
    const [viewState, setViewState] = useState<ViewState>(switchToIdle());

    const newParams = {
        ...params,
        setViewState
    };

    const idleViewModel = useIdleViewModel(newParams);
    const stickersViewModel = useStickersViewModel(newParams);
    const selectionViewModel = useSelectionViewModel(newParams);
    const draggingViewModel = useDraggingViewModel(newParams);

    let viewModel: OmitFields<ViewModel, "actions">;
    switch (viewState.type) {
        case "idle":
            viewModel = idleViewModel(viewState);
            break;
        case "stickers":
            viewModel = stickersViewModel();
            break;
        case "selection":
            viewModel = selectionViewModel(viewState);
            break;
        case "dragging":
            viewModel = draggingViewModel(viewState);
            break;
        default:
            throw new Error("Unknown view state");
    }

    return applyDecorators(viewModel, viewState, newParams);
}
