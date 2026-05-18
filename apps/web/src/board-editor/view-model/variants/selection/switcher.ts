import type { Id } from "@repo/common";
import type { SelectionViewState } from "./view-state";

type Params = {
    nodeIds?: Set<Id>;
};

export function switchToSelection({ nodeIds }: Params): SelectionViewState {
    return {
        type: "selection",
        nodeIds: nodeIds ?? new Set()
    };
}
