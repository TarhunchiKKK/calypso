import type { Boards, Point } from "@repo/common";

export const ShapeVariantsReferencePointsMap: Record<Boards.ShapeVariants, (node: Boards.ShapeNode) => Point[]> = {
    rectangle: node => [
        { x: 0, y: 0 },
        { x: node.rect.width, y: 0 },
        { x: node.rect.width, y: node.rect.height },
        { x: 0, y: node.rect.height }
    ],
    circle: node => [
        { x: node.rect.width / 2, y: 0 },
        { x: node.rect.width, y: node.rect.height / 2 },
        { x: node.rect.width / 2, y: node.rect.height },
        { x: 0, y: node.rect.height / 2 }
    ],
    triangle: node => [
        { x: node.rect.width / 2, y: 0 },
        { x: node.rect.width, y: node.rect.height },
        { x: 0, y: node.rect.height }
    ],
    diamond: node => [
        { x: node.rect.width / 2, y: 0 },
        { x: node.rect.width, y: node.rect.height / 2 },
        { x: node.rect.width / 2, y: node.rect.height },
        { x: 0, y: node.rect.height / 2 }
    ],
    star: node => [
        { x: node.rect.width * 0.5, y: 0 },
        { x: node.rect.width * 0.65, y: node.rect.height * 0.35 },
        { x: node.rect.width, y: node.rect.height * 0.4 },
        { x: node.rect.width * 0.7, y: node.rect.height * 0.65 },
        { x: node.rect.width * 0.8, y: node.rect.height },
        { x: node.rect.width * 0.5, y: node.rect.height * 0.8 },
        { x: node.rect.width * 0.2, y: node.rect.height },
        { x: node.rect.width * 0.3, y: node.rect.height * 0.65 },
        { x: 0, y: node.rect.height * 0.4 },
        { x: node.rect.width * 0.35, y: node.rect.height * 0.35 }
    ],
    hexagon: node => [
        { x: node.rect.width / 2, y: 0 },
        { x: node.rect.width, y: node.rect.height * 0.3 },
        { x: node.rect.width, y: node.rect.height * 0.7 },
        { x: node.rect.width / 2, y: node.rect.height },
        { x: 0, y: node.rect.height * 0.7 },
        { x: 0, y: node.rect.height * 0.3 }
    ]
};
