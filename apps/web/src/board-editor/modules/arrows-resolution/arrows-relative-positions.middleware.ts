import { NodesFactory } from "@/board-editor/nodes";
import { NodeRectsFactory } from "@/board-editor/nodes/compose/factories/node-rects.factory";
import type { NodesServiceMiddleware } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";

export const ARROW_RELATIVE_POSITIONS_MIDDLEWARE_KEY = Symbol();

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
            for (const node of payload.nodes) {
                const arrow = arrows.find(arrow => arrow.start.relativeTo === node.id || arrow.end.relativeTo === node.id);

                if (!arrow) {
                    continue;
                }

                const updatedNodeRect = NodeRectsFactory.rect(node);

                for (const side of ["start", "end"] as const) {
                    if (arrow[side].relativeTo === node.id) {
                        const newPoint = Geometry.addPoints(arrow[side], updatedNodeRect);

                        arrow[side] = {
                            ...newPoint,
                            relativeTo: node.id
                        };
                    }
                }
            }
            break;
        }
        case "remove": {
            for (const removingNodeId of payload.nodes) {
                const arrow = arrows.find(node => node.start.relativeTo === removingNodeId || node.end.relativeTo === removingNodeId);

                if (!arrow) {
                    continue;
                }

                const removingNode = nodes.find(node => node.id === removingNodeId);

                if (!removingNode) {
                    throw Error(`Node with id ${removingNodeId} not found`);
                }

                const removingNodeRect = NodeRectsFactory.rect(removingNode);

                for (const side of ["start", "end"] as const) {
                    if (arrow[side].relativeTo === removingNodeId) {
                        arrow[side] = Geometry.addPoints(arrow[side], removingNodeRect);
                    }
                }
            }
            break;
        }
    }

    return nodes;
};
