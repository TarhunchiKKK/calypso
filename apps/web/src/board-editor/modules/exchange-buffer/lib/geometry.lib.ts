import type { NodeBase } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { NodeRectsFactory } from "@/board-editor/nodes/compose/factories/node-rects.factory";
import { Geometry } from "@/shared/lib/geometry";

const basePoint: Point = {
    x: 0,
    y: 0
};

export function calculateMinPoint(nodes: NodeBase[]) {
    let minPoint: Point | null = null;

    for (const node of nodes) {
        const rect = NodeRectsFactory.rect(node);

        if (!minPoint) {
            minPoint = rect;
            continue;
        }

        const currentDistance = Geometry.pointsDistance(basePoint, minPoint);
        const distance = Geometry.pointsDistance(basePoint, rect);

        if (distance < currentDistance) {
            minPoint = rect;
        }
    }

    if (!minPoint) {
        throw Error("Min point not calculated");
    }

    return minPoint;
}
