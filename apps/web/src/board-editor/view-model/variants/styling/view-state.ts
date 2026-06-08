import type { Id, Point } from "@lib/common";

export type StylingViewState = {
    type: "styling";

    nodeIds: Set<Id>;

    position: Point;
};
