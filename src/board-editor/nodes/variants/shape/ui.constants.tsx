import { Circle, Diamond, Hexagon, Square, Star, Triangle } from "lucide-react";
import type { ShapeVariants } from "./shape-node.type";

export const ShapeVariantIconsMap: Record<ShapeVariants, React.ReactNode> = {
    rectangle: <Square className="w-full h-full" />,
    circle: <Circle className="w-full h-full" />,
    triangle: <Triangle className="w-full h-full" />,
    diamond: <Diamond className="w-full h-full" />,
    star: <Star className="w-full h-full" />,
    hexagon: <Hexagon className="w-full h-full" />
};
