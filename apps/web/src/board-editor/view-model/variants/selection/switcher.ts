import type { Id } from "@repo/common";
import type { SelectionViewState } from "./view-state";

type Params = {
    selectedIds?: Set<Id>;
};

export function switchToSelection({ selectedIds }: Params): SelectionViewState {
    return {
        type: "selection",
        selectedIds: selectedIds ?? new Set()
    };
}
