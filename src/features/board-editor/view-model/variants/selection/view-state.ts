import { Rect } from "@/features/board-editor/domain/geometry";

export type SelectionViewState = {
    type: "selection";

    selectedIds: Set<string>;

    selectionWindow?: Rect;

    skipNextClick?: boolean;
};
