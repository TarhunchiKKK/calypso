import type { Point } from "@repo/common";

export type StylingViewState = {
    type: "styling";

    selectedIds: Set<string>;

    barPosition: Point;
};
