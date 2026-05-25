import type { ArrowNode, NodeBase } from "@repo/boards";
import { NodeRectsFactory } from "@/entities/nodes";
import { type ArrowAbsolutePosition, ArrowSides } from "./types";

export function resolveArrowAbsolutePosition(nodes: NodeBase[], arrow: ArrowNode): ArrowAbsolutePosition {
    const result = {
        start: arrow.start,
        end: arrow.end
    };

    for (const side of ArrowSides) {
        if (arrow[side].relativeTo) {
            // TEMP: Add `findOne` method
            const relativeNode = nodes.find((node) => node.id === arrow[side].relativeTo);

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
