import type { Id, Rect } from "@repo/common";

export type SelectionViewState = {
    type: "selection";

    selectedIds: Set<Id>;

    selectionWindow?: Rect;

    skipNextClick?: boolean;
};
