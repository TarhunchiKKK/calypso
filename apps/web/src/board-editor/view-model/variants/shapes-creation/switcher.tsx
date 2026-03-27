import type { Boards } from "@repo/common";
import type { ShapesCreationViewState } from "./view-state";

export function switchToShapesCreation(variant: Boards.ShapeVariants): ShapesCreationViewState {
    return {
        type: "shapes-creation",
        variant: variant
    };
}
