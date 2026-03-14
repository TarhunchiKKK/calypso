import type { ShapeVariants } from "@/board-editor/nodes/variants/shape/shape-node.type";
import type { ShapesCreationViewState } from "./view-state";

export function switchToShapesCreation(variant: ShapeVariants): ShapesCreationViewState {
    return {
        type: "shapes-creation",
        variant: variant
    };
}
