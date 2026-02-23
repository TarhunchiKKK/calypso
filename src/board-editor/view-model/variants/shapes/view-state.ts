import type { ShapeVariants } from "@/board-editor/nodes/variants/shape/shape-node.type";

export type ShapesViewState = {
    type: "shapes";

    variant: ShapeVariants;
};
