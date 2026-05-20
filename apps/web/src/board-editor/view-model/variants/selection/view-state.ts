import type { Id, Rect } from "@repo/common";

export type SelectionViewState = {
    type: "selection";

    nodeIds: Set<Id>;

    selectionWindow?: Rect;
};
