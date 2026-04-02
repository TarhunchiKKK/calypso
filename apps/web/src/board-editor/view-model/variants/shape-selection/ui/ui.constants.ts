import type { ShapeVariants } from "@repo/boards-common";
import type { Offset } from "@repo/common";
import { Circle, Diamond, Hexagon, Square, Star, Triangle } from "lucide-react";

export const ShapeVariantsIconsMap = {
    rectangle: Square,
    circle: Circle,
    triangle: Triangle,
    diamond: Diamond,
    star: Star,
    hexagon: Hexagon
} satisfies Record<ShapeVariants, unknown>;

export const IconsSizes = { width: 32, height: 32 };

export const ShapeSelectorOffset: Offset = {
    dx: 120,
    dy: 0
};
