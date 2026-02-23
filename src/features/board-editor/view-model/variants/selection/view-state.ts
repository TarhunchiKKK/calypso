import type { Rect } from "@/shared/lib/geometry";

export type SelectionViewState = {
    type: "selection";

    selectedIds: Set<string>;

    selectionWindow?: Rect;

    skipNextClick?: boolean;
};
