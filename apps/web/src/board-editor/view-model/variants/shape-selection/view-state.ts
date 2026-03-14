import type { Point } from "@/shared/lib/geometry";

export type ShapeSelectionViewState = {
    type: "shape-selection";

    clickPoint: Point;
};
