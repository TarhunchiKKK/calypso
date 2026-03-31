import type { Boards } from "@repo/common";
import { NodeDecoratorsFactory } from "@/board-editor/nodes/compose/factories/node-decorators.factory";
import type { NodesServiceMiddleware } from "@/entities/nodes/model/use-nodes-service.hook";
import { Geometry } from "@/shared/lib/geometry";

export const ArrowsRelativePositionsMiddleware: NodesServiceMiddleware = (nodes, payload) => {
    // FIX: type casting
    const arrows: Boards.ArrowNode[] = nodes.filter(node => node.type === "arrow") as any;

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

                const removingNodeWrapper = NodeDecoratorsFactory.wrap(removingNode);

                if (arrow.start.relativeTo === removingNodeId) {
                    arrow.start = Geometry.addPoints(arrow.start, removingNodeWrapper.rect);
                }

                if (arrow.end.relativeTo === removingNodeId) {
                    arrow.end = Geometry.addPoints(arrow.end, removingNodeWrapper.rect);
                }
            }
            break;
        }
    }

    return nodes;
};
