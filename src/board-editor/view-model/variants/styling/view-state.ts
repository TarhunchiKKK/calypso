import type { Point } from "@/shared/lib/geometry";

export type StylingViewState = {
    type: "styling";

    selectedIds: Set<string>;

    position: Point;
};
