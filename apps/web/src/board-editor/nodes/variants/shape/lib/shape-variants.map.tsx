import type { ShapeNode, ShapeVariants } from "@lib/boards";
import type React from "react";
import type { NodeHandlers } from "@/board-editor/core";
import { computeShapeReferencePoints } from "./shape-variants-reference-points.map";

type CreateFunction = (node: ShapeNode, handler: NodeHandlers) => React.ReactNode;

export const ShapeVariantsMap: Record<ShapeVariants, CreateFunction> = {
    rectangle: (node, handlers) => {
        return (
            <rect
                x={0}
                y={0}
                width={node.rect.width}
                height={node.rect.height}
                fill={node.styles.backgroundColor}
                stroke={node.styles.borderColor}
                {...handlers}
            />
        );
    },
    circle: (node, handlers) => {
        const dimensions = {
            cx: node.rect.width / 2,
            cy: node.rect.height / 2,
            rx: node.rect.width / 2,
            ry: node.rect.height / 2
        };

        return <ellipse {...dimensions} fill={node.styles.backgroundColor} stroke={node.styles.borderColor} {...handlers} />;
    },
    triangle: (node, handlers) => {
        const referencePoints = computeShapeReferencePoints(node);

        return (
            <polygon
                points={referencePoints.map((point) => `${point.x},${point.y}`).join(" ")}
                fill={node.styles.backgroundColor}
                stroke={node.styles.borderColor}
                {...handlers}
            />
        );
    },
    diamond: (node, handlers) => {
        const referencePoints = computeShapeReferencePoints(node);

        return (
            <polygon
                points={referencePoints.map((point) => `${point.x},${point.y}`).join(" ")}
                fill={node.styles.backgroundColor}
                stroke={node.styles.borderColor}
                {...handlers}
            />
        );
    },
    star: (node, handlers) => {
        const referencePoints = computeShapeReferencePoints(node);

        return (
            <polygon
                points={referencePoints.map((point) => `${point.x},${point.y}`).join(" ")}
                fill={node.styles.backgroundColor}
                stroke={node.styles.borderColor}
                {...handlers}
            />
        );
    },
    hexagon: (node, handlers) => {
        const referencePoints = computeShapeReferencePoints(node);

        return (
            <polygon
                points={referencePoints.map((point) => `${point.x},${point.y}`).join(" ")}
                fill={node.styles.backgroundColor}
                stroke={node.styles.borderColor}
                {...handlers}
            />
        );
    }
};
