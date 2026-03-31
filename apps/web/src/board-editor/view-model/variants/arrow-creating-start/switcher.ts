import type { ArrowCreatingStartViewState } from "./view-state";

export function switchToArrowCreatingStart(): ArrowCreatingStartViewState {
    return {
        type: "arrow-creating-start"
    };
}
