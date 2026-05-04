import type { Id } from "@repo/common";
import type { SelectionViewState } from "./view-state";

type Params = {
    selectedIds?: Set<Id>;

    // REFACTOR: remove this arg
    skipNextClick?: boolean;
};

export function switchToSelection({ selectedIds, skipNextClick }: Params): SelectionViewState {
    return {
        type: "selection",
        selectedIds: selectedIds ?? new Set(),
        skipNextClick: skipNextClick
    };
}
