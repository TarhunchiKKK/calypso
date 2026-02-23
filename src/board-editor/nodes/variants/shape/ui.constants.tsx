import { Circle, Diamond, Hexagon, Square, Star, Triangle } from "lucide-react";
import type { ShapeVariants } from "./shape-node.type";

export const ShapeVariantIconsMap: Record<ShapeVariants, React.ReactNode> = {
    rectangle: <Square />,
    circle: <Circle />,
    triangle: <Triangle />,
    diamond: <Diamond />,
    star: <Star />,
    hexagon: <Hexagon />
};
