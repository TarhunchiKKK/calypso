import type { NodeBase } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { NodeRectsFactory } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";

const basePoint: Point = {
    x: 0,
    y: 0
};

export function calculateMiddlePoint(nodes: NodeBase[]) {
    let minPoint: Point | null = null;
    let maxPoint: Point | null = null;

    for (const node of nodes) {
        const rect = NodeRectsFactory.rect(node);
        const minRectPoint: Point = { x: rect.x, y: rect.y };
        const maxRectPoint: Point = { x: rect.x + rect.width, y: rect.y + rect.height };

        if (!minPoint) {
            minPoint = minRectPoint;
        }

        if (!maxPoint) {
            maxPoint = maxRectPoint;
        }

        const minDistance = Geometry.pointsDistance(basePoint, minPoint);
        const maxDistance = Geometry.pointsDistance(basePoint, maxPoint);

        const minRectDistance = Geometry.pointsDistance(basePoint, minRectPoint);
        const maxRectDistance = Geometry.pointsDistance(basePoint, maxRectPoint);

        if (minRectDistance < minDistance) {
            minPoint = minRectPoint;
        }

        if (maxRectDistance > maxDistance) {
            maxPoint = maxRectPoint;
        }
    }

    if (!minPoint || !maxPoint) {
        throw Error("Min/max point not calculated");
    }

    return Geometry.middlePoint(minPoint, maxPoint);
}
