import { Rect } from "@/features/board-editor/core";

export type SelectionViewState = {
    type: "selection";

    selectedIds: Set<string>;

    selectionWindow?: Rect;

    skipNextClick?: boolean;
};
