import type { NodeBase } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { NodeRectsFactory } from "@/board-editor/nodes/compose/factories/node-rects.factory";
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

        if (!minPoint) {
            minPoint = rect;
        }

        if (!maxPoint) {
            maxPoint = {
                x: rect.x + rect.width,
                y: rect.y + rect.height
            };
        }

        const minDistance = Geometry.pointsDistance(basePoint, minPoint);
        const maxDistance = Geometry.pointsDistance(basePoint, maxPoint);
        const distance = Geometry.pointsDistance(basePoint, rect);

        if (distance < minDistance) {
            minPoint = rect;
        }

        if (distance > maxDistance) {
            maxPoint = {
                x: rect.x + rect.width,
                y: rect.y + rect.height
            };
        }
    }

    if (!minPoint || !maxPoint) {
        throw Error("Min/max point not calculated");
    }

    return Geometry.middlePoint(minPoint, maxPoint);
}
