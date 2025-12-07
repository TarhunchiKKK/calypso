import { useState } from "react";
import { ViewModelParams, ViewState } from "./types";
import { useIdleViewModel } from "./use-idle-view-model";
import { useStickersViewModel } from "./use-stickers-view-model";

export function useViewModel(params: ViewModelParams) {
    const [viewState] = useState<ViewState>({ type: "stickers" });

    const idleViewModel = useIdleViewModel(params);
    const stickersViewModel = useStickersViewModel(params);

    switch (viewState?.type) {
        case "idle":
            return idleViewModel();
        case "stickers":
            return stickersViewModel();
        default:
            throw new Error("Unknown view state");
    }
}
