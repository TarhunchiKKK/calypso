import type { Boards } from "@repo/common";
import { Circle, Diamond, Hexagon, Square, Star, Triangle } from "lucide-react";

export const ShapeVariantsIconsMap = {
    rectangle: Square,
    circle: Circle,
    triangle: Triangle,
    diamond: Diamond,
    star: Star,
    hexagon: Hexagon
} satisfies Record<Boards.ShapeVariants, unknown>;
