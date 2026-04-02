import type { ArrowCreationViewState } from "./view-state";

export function switchToArrowCreation(): ArrowCreationViewState {
    return {
        type: "arrow-creation"
    };
}
