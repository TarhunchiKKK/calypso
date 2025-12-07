import { useState } from "react";
import { ViewModelParams, ViewState } from "./types";
import { switchToIdle, useIdleViewModel } from "./use-idle-view-model";
import { useStickersViewModel } from "./use-stickers-view-model";
import { OmitFields } from "@/shared/lib/typescript";

export function useViewModel(params: OmitFields<ViewModelParams, "setViewState">) {
    const [viewState, setViewState] = useState<ViewState>(switchToIdle());

    const newParams = {
        ...params,
        setViewState
    };

    const idleViewModel = useIdleViewModel(newParams);
    const stickersViewModel = useStickersViewModel(newParams);

    switch (viewState.type) {
        case "idle":
            return idleViewModel();
        case "stickers":
            return stickersViewModel();
        default:
            throw new Error("Unknown view state");
    }
}
