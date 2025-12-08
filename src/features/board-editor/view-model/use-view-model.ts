import { useState } from "react";
import { ViewModel, ViewModelParams, ViewState } from "./types";
import { switchToIdle, useIdleViewModel } from "./variants/use-idle-view-model";
import { useStickersViewModel } from "./variants/use-stickers-view-model";
import { OmitFields } from "@/shared/lib/typescript";
import { useSelectionViewModel } from "./variants/use-selection-view-model";
import { withActions } from "./decorators/with-actions";

export function useViewModel(params: OmitFields<ViewModelParams, "viewState" | "setViewState">) {
    const [viewState, setViewState] = useState<ViewState>(switchToIdle());

    const newParams = {
        ...params,
        viewState,
        setViewState
    };

    const idleViewModel = useIdleViewModel(newParams);
    const stickersViewModel = useStickersViewModel(newParams);
    const selectionViewModel = useSelectionViewModel(newParams);

    let viewModel: OmitFields<ViewModel, "actions">;
    switch (viewState.type) {
        case "idle":
            viewModel = idleViewModel();
            break;
        case "stickers":
            viewModel = stickersViewModel();
            break;
        case "selection":
            viewModel = selectionViewModel(viewState);
            break;
        default:
            throw new Error("Unknown view state");
    }

    return withActions(newParams, viewModel);
}
