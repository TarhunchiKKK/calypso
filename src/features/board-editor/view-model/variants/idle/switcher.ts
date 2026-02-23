import type { IdleViewState } from "./view-state";

export function switchToIdle(): IdleViewState {
    return {
        type: "idle"
    };
}
