import type { ShapeNode, ShapeVariants } from "@lib/boards";
import type { Point } from "@repo/common";

export const ShapeVariantsReferencePointsMap: Record<ShapeVariants, Point[]> = {
    rectangle: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 }
    ],
    circle: [
        { x: 0.5, y: 0 },
        { x: 1, y: 0.5 },
        { x: 0.5, y: 1 },
        { x: 0, y: 0.5 }
    ],
    triangle: [
        { x: 0.5, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 }
    ],
    diamond: [
        { x: 0.5, y: 0 },
        { x: 1, y: 0.5 },
        { x: 0.5, y: 1 },
        { x: 0, y: 0.5 }
    ],
    star: [
        { x: 0.5, y: 0 },
        { x: 0.65, y: 0.35 },
        { x: 1, y: 0.4 },
        { x: 0.7, y: 0.65 },
        { x: 0.8, y: 1 },
        { x: 0.5, y: 0.8 },
        { x: 0.2, y: 1 },
        { x: 0.3, y: 0.65 },
        { x: 0, y: 0.4 },
        { x: 0.35, y: 0.35 }
    ],
    hexagon: [
        { x: 0.5, y: 0 },
        { x: 1, y: 0.3 },
        { x: 1, y: 0.7 },
        { x: 0.5, y: 1 },
        { x: 0, y: 0.7 },
        { x: 0, y: 0.3 }
    ]
};

export function computeShapeReferencePoints(shape: ShapeNode) {
    const referencePoints = ShapeVariantsReferencePointsMap[shape.variant];

    return referencePoints.map((point) => ({
        x: shape.rect.width * point.x,
        y: shape.rect.height * point.y
    }));
}
