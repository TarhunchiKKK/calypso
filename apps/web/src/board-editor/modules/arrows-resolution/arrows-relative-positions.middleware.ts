import { NodesFactory } from "@/board-editor/nodes";
import { NodeRectsFactory } from "@/board-editor/nodes/compose/factories/node-rects.factory";
import type { NodesServiceMiddleware } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";

export const ArrowsRelativePositionsMiddleware: NodesServiceMiddleware = (nodes, payload) => {
    const arrows = nodes.filter(node => node.type === "arrow");

    if (!NodesFactory.are(arrows, "arrow")) {
        return nodes;
    }

    switch (payload.operation) {
        case "create": {
            break;
        }
        case "update": {
            break;
        }
        case "remove": {
            for (const removingNodeId of payload.nodes) {
                const arrow = arrows.find(
                    node => node.start.relativeTo === removingNodeId || node.end.relativeTo === removingNodeId
                );

                if (!arrow) {
                    continue;
                }

                const removingNode = nodes.find(node => node.id === removingNodeId);

                if (!removingNode) {
                    throw Error(`ArrowsRelativePositionsMiddleware: node with id ${removingNodeId} not found`);
                }

                const removingNodeRect = NodeRectsFactory.rect(removingNode);

                if (arrow.start.relativeTo === removingNodeId) {
                    arrow.start = Geometry.addPoints(arrow.start, removingNodeRect);
                }

                if (arrow.end.relativeTo === removingNodeId) {
                    arrow.end = Geometry.addPoints(arrow.end, removingNodeRect);
                }
            }
            break;
        }
    }

    return nodes;
};
