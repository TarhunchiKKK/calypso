import type { Id, Rect } from "@lib/common";

export type SelectionViewState = {
    type: "selection";

    nodeIds: Set<Id>;

    selectionWindow?: Rect;
};
