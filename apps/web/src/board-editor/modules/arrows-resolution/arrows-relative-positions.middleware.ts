import { type Boards, DebugException } from "@repo/common";
import { NodeDecoratorsFactory } from "@/board-editor/nodes/compose/factories/node-decorators.factory";
import type { NodesServiceMiddleware } from "@/entities/nodes/model/use-nodes-service.hook";
import { Geometry } from "@/shared/lib/geometry";

export const ArrowsRelativePositionsMiddleware: NodesServiceMiddleware = (nodes, payload) => {
    switch (payload.operation) {
        case "create": {
            break;
        }
        case "update": {
            break;
        }
        case "remove": {
            for (const removingNodeId of payload.nodes) {
                for (const node of nodes) {
                    if (node.type === "arrow") {
                        const arrowNode = node as Boards.ArrowNode;

                        if (
                            arrowNode.start.relativeTo === removingNodeId ||
                            arrowNode.end.relativeTo === removingNodeId
                        ) {
                            const removingNode = nodes.find(node => node.id === removingNodeId);

                            if (!removingNode) {
                                throw new DebugException(
                                    `ArrowsRelativePositionsMiddleware: Node with id ${removingNodeId} not found`
                                );
                            }

                            const removingNodeWrapper = NodeDecoratorsFactory.wrap(removingNode);

                            if (arrowNode.start.relativeTo === removingNodeId) {
                                arrowNode.start = Geometry.addPoints(arrowNode.start, removingNodeWrapper.rect);
                            }

                            if (arrowNode.end.relativeTo === removingNodeId) {
                                arrowNode.end = Geometry.addPoints(arrowNode.end, removingNodeWrapper.rect);
                            }
                        }
                    }
                }
            }
            break;
        }
    }

    return nodes;
};
