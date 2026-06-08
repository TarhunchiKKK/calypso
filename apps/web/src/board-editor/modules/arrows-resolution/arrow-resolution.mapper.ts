import type { ArrowNode, NodeBase } from "@lib/boards";
import type { Id } from "@repo/common";
import { NodeRectsFactory, NodesFactory, type NodesServiceMapper } from "@/entities/nodes";
import { ArrowSides, type ResolvedArrow } from "./lib";

function resolveArrow(arrow: ArrowNode, util: { findOne: (nodeId: Id) => NodeBase }): ResolvedArrow {
    const result: ResolvedArrow = {
        ...arrow,
        absolutePosition: {
            start: arrow.start,
            end: arrow.end
        }
    };

    for (const side of ArrowSides) {
        if (arrow[side].relativeTo) {
            const relativeNode = util.findOne(arrow[side].relativeTo);

            const relativeNodeRect = NodeRectsFactory.rect(relativeNode);

            result.absolutePosition[side] = {
                x: relativeNodeRect.x + relativeNodeRect.width * arrow[side].x,
                y: relativeNodeRect.y + relativeNodeRect.height * arrow[side].y
            };
        }
    }

    return result;
}

// OPTIMIZE: Add map for nodes
export const ArrowResolutionMapper: NodesServiceMapper = (nodes, util) => {
    return nodes.map((node) => {
        if (NodesFactory.is(node, "arrow")) {
            return resolveArrow(node, util);
        }

        return node;
    });
};
