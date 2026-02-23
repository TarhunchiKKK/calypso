import type { ShapeVariants } from "@/board-editor/nodes/variants/shape/shape-node.type";
import type { Offset } from "@/shared/lib/geometry";

export const AvailableShapeVariants: ShapeVariants[] = ["rectangle", "circle", "triangle", "diamond", "star", "hexagon"];

export const IconsSizes = { width: 32, height: 32 };

export const ShapeSelectorOffset: Offset = {
    dx: 120,
    dy: 0
};
