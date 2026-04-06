import type { TextCreationViewState } from "./view-state";

export function switchToTextCreation(): TextCreationViewState {
    return {
        type: "text-creation"
    };
}
