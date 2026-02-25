import type { RectNode } from "@/entities/nodes";

export type ShapeVariants = "rectangle" | "circle" | "triangle" | "diamond" | "star" | "hexagon";

export type ShapeNode = RectNode & {
    type: "shape";

    variant: ShapeVariants;
};
