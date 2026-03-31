import type { Point } from "@repo/common";
import type { ArrowCreatingEndViewState } from "./view-state";

export function switchToArrowCreatingEnd(point: Point): ArrowCreatingEndViewState {
    return {
        type: "arrow-creating-end",
        startPoint: point
    };
}
