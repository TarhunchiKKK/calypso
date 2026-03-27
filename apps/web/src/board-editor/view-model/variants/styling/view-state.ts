import type { Id, Point } from "@repo/common";

export type StylingViewState = {
    type: "styling";

    selectedIds: Set<Id>;

    position: Point;
};
