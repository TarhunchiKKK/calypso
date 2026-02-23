import type { RectNode } from "@/board-editor/core";

export type ShapeVariants = "rectangle" | "circle" | "triangle" | "rhomb" | "star" | "hexagon";

export type ShapeNode = RectNode & {
    type: "shape";

    variant: ShapeVariants;
};
