import type { Point } from "@repo/common";

export type MediaSelectionViewState = {
    type: "media-selection";

    clickPoint: Point;
};
