import type { Boards, Offset } from "@repo/common";


export const AvailableShapeVariants: Boards.ShapeVariants[] = [
    "rectangle",
    "circle",
    "triangle",
    "diamond",
    "star",
    "hexagon"
];

export const IconsSizes = { width: 32, height: 32 };

export const ShapeSelectorOffset: Offset = {
    dx: 120,
    dy: 0
};
