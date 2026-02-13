import type { Rect } from "@repo/common";

export type SelectionViewState = {
    type: "selection";

    selectedIds: Set<string>;

    selectionWindow?: Rect;

    skipNextClick?: boolean;
};
