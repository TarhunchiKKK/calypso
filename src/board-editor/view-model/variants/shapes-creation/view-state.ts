import type { ShapeVariants } from "@/board-editor/nodes/variants/shape/shape-node.type";

export type ShapesCreationViewState = {
    type: "shapes-creation";

    variant: ShapeVariants;
};
