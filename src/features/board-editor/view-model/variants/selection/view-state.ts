import { Rect } from "@/features/board-editor/lib/geometry";

export type SelectionViewState = {
    type: "selection";

    selectedIds: Set<string>;

    selectionWindow?: Rect;

    skipNextClick?: boolean;
};
