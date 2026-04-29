import type { ArrowNode, NodeBase } from "@repo/boards-common";
import { NodeRectsFactory } from "@/board-editor/nodes/compose/factories/node-rects.factory";
import type { ArrowAbsolutePosition } from "./types";

export function resolveArrowAbsolutePosition(nodes: NodeBase[], arrow: ArrowNode): ArrowAbsolutePosition {
    const result = {
        start: arrow.start,
        end: arrow.end
    };

    for (const side of ["start", "end"] as const) {
        if (arrow[side].relativeTo) {
            const relativeNode = nodes.find(node => node.id === arrow[side].relativeTo);

            if (!relativeNode) {
                throw new Error(`Relative ${side} node with id="${arrow[side].relativeTo}" to arrow with id="${arrow.id}" not found`);
            }

            const relativeNodeRect = NodeRectsFactory.rect(relativeNode);

            result[side] = {
                x: relativeNodeRect.x + relativeNodeRect.width * arrow[side].x,
                y: relativeNodeRect.y + relativeNodeRect.height * arrow[side].y
            };
        }
    }

    return result;
}
