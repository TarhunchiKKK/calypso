import type { Id, Point } from "@repo/common";

export type StylingViewState = {
    type: "styling";

    nodeIds: Set<Id>;

    position: Point;
};
