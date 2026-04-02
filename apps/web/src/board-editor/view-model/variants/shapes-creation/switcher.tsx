import type { ShapesCreationViewState } from "./view-state";
import type { ShapeVariants } from "@repo/boards-common";

export function switchToShapesCreation(variant: ShapeVariants): ShapesCreationViewState {
    return {
        type: "shapes-creation",
        variant: variant
    };
}
