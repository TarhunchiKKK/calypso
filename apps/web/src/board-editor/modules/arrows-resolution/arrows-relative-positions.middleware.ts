import type { ArrowNode, NodeBase } from "@repo/boards-common";
import { NodeRectsFactory, NodesFactory, type NodesServiceMiddleware } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";

export const ARROW_RELATIVE_POSITIONS_MIDDLEWARE_KEY = Symbol();

function getArrows(nodes: NodeBase[]): ArrowNode[] {
    const arrows = nodes.filter(node => node.type === "arrow");

    if (!NodesFactory.are(arrows, "arrow")) {
        return [];
    }

    return arrows;
}

/**
 * This middleware ensures that arrows will be always binded to existing node.
 *
 * @param nodes All board nodes.
 * @param payload Middleware payload.
 * @returns Nodes array with applied changes.
 */
export const ArrowsRelativePositionsMiddleware: NodesServiceMiddleware = (nodes, payload) => {
    switch (payload.operation) {
        case "remove": {
            const arrows = getArrows(nodes);

            for (const nodeId of payload.nodes) {
                const relatedArrows = arrows.filter(arrow => arrow.start.relativeTo === nodeId || arrow.end.relativeTo === nodeId);

                if (relatedArrows.length === 0) {
                    return nodes;
                }

                const removingNode = nodes.find(node => node.id === nodeId);

                if (!removingNode) {
                    throw Error(`Node with id ${nodeId} not found`);
                }

                const removingNodeRect = NodeRectsFactory.rect(removingNode);

                for (const arrow of relatedArrows) {
                    for (const side of ["start", "end"] as const) {
                        if (arrow[side].relativeTo === nodeId) {
                            arrow[side] = Geometry.addPoints(arrow[side], removingNodeRect);
                        }
                    }
                }
            }
            break;
        }
    }

    return nodes;
};
