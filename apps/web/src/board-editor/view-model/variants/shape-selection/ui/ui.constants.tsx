import type { ShapeVariants } from "@repo/boards-common";
import type { Offset } from "@repo/common";
import { Circle, CircleIcon, Diamond, Hexagon, HexagonIcon, Square, SquareIcon, Star, StarIcon, Triangle, TriangleIcon } from "lucide-react";

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
    dx: 100,
    dy: 0
};

export const ShapeSelectorItems = [
    {
        label: "Rectangle",
        icon: <SquareIcon />,
        value: "rectangle" satisfies ShapeVariants
    },
    {
        label: "Circle",
        icon: <CircleIcon />,
        value: "circle" satisfies ShapeVariants
    },
    {
        label: "Triangle",
        icon: <TriangleIcon />,
        value: "triangle" satisfies ShapeVariants
    },
    {
        label: "Diamond",
        icon: <Diamond />,
        value: "diamond" satisfies ShapeVariants
    },
    {
        label: "Star",
        icon: <StarIcon />,
        value: "star" satisfies ShapeVariants
    },
    {
        label: "Hexagon",
        icon: <HexagonIcon />,
        value: "hexagon" satisfies ShapeVariants
    }
] as const;
