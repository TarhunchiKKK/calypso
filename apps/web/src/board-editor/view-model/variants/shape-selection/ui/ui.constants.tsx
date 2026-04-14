import type { ShapeVariants } from "@repo/boards-common";
import type { Offset } from "@repo/common";
import { Circle, CircleIcon, Diamond, Hexagon, HexagonIcon, Square, SquareIcon, Star, StarIcon, Triangle, TriangleIcon } from "lucide-react";
import { BoardHotKeys } from "@/board-editor/lib/hot-keys.lib";

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
        value: "rectangle" satisfies ShapeVariants,
        hotKey: BoardHotKeys.switch.toCreation.shape.rectangle
    },
    {
        label: "Circle",
        icon: <CircleIcon />,
        value: "circle" satisfies ShapeVariants,
        hotKey: BoardHotKeys.switch.toCreation.shape.circle
    },
    {
        label: "Triangle",
        icon: <TriangleIcon />,
        value: "triangle" satisfies ShapeVariants,
        hotKey: null
    },
    {
        label: "Diamond",
        icon: <Diamond />,
        value: "diamond" satisfies ShapeVariants,
        hotKey: null
    },
    {
        label: "Star",
        icon: <StarIcon />,
        value: "star" satisfies ShapeVariants,
        hotKey: null
    },
    {
        label: "Hexagon",
        icon: <HexagonIcon />,
        value: "hexagon" satisfies ShapeVariants,
        hotKey: BoardHotKeys.switch.toCreation.shape.hexagon
    }
] as const;
