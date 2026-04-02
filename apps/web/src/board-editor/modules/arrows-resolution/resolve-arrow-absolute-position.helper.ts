import type { Boards } from "@repo/common";
import { NodeRectsFactory } from "@/board-editor/nodes/compose/factories/node-rects.factory";
import { Geometry } from "@/shared/lib/geometry";
import type { ArrowAbsolutePosition } from "./types";

export function resolveArrowAbsolutePosition(nodes: Boards.NodeBase[], arrow: Boards.ArrowNode): ArrowAbsolutePosition {
    const result = {
        start: arrow.start,
        end: arrow.end
    };

    for (const pointKey of ["start", "end"] as const) {
        if (arrow[pointKey].relativeTo) {
            const relativeNode = nodes.find(node => node.id === arrow[pointKey].relativeTo);

            if (!relativeNode) {
                throw new Error(
                    `Relative ${pointKey} node with id="${arrow[pointKey].relativeTo}" to arrow with id="${arrow.id}" not found`
                );
            }

            const relativeNodeRect = NodeRectsFactory.rect(relativeNode);

            result[pointKey] = Geometry.addPoints(relativeNodeRect, arrow[pointKey]);
        }
    }

    return result;
}
