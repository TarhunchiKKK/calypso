import type { Point } from "@repo/common";

export type ShapeSelectionViewState = {
    type: "shape-selection";

    clickPoint: Point;
};
