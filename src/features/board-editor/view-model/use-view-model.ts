import { useState } from "react";
import { ViewModelParams, ViewState } from "./types";
import { switchToIdle, useIdleViewModel } from "./variants/use-idle-view-model";
import { useStickersViewModel } from "./variants/use-stickers-view-model";
import { OmitFields } from "@/shared/lib/typescript";
import { useSelectionViewModel } from "./variants/use-selection-view-model";

export function useViewModel(params: OmitFields<ViewModelParams, "setViewState">) {
    const [viewState, setViewState] = useState<ViewState>(switchToIdle());

    const newParams = {
        ...params,
        setViewState
    };

    const idleViewModel = useIdleViewModel(newParams);
    const stickersViewModel = useStickersViewModel(newParams);
    const selectionViewModel = useSelectionViewModel(newParams);

    switch (viewState.type) {
        case "idle":
            return idleViewModel();
        case "stickers":
            return stickersViewModel();
        case "selection":
            return selectionViewModel(viewState);
        default:
            throw new Error("Unknown view state");
    }
}
