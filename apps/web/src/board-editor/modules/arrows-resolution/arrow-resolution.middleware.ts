import type { ArrowNode, NodeBase } from "@repo/boards";
import type { Id } from "@repo/common";
import { useCallback, useEffect, useRef } from "react";
import { NodeRectsFactory, NodesFactory, type NodesServiceMiddleware } from "@/entities/nodes";
import { ArrowSides } from "./types";

export const ARROW_RESOLUTION_MIDDLEWARE_KEY = Symbol();

type RelationsMap = Record<Id, Id[]>;

function getRelationsMap(nodes: NodeBase[]) {
    const map: RelationsMap = {};

    for (const node of nodes) {
        map[node.id] = [];
    }

    for (const node of nodes) {
        if (NodesFactory.is(node, "arrow")) {
            for (const side of ArrowSides) {
                if (node[side].relativeTo) {
                    map[node[side].relativeTo].push(node.id);
                }
            }
        }
    }

    return map;
}

/**
 * This middleware ensures that arrows will be always binded to existing node.
 * If related node deleted - this middleware unbinds arrow to corresponding position.
 *
 * @param nodes All board nodes.
 * @param payload Middleware payload.
 * @returns Nodes array with applied changes.
 */
export function useArrowResolutionMiddleware(nodes: NodeBase[]): NodesServiceMiddleware {
    const relationsMapRef = useRef<RelationsMap>({});

    useEffect(() => {
        relationsMapRef.current = getRelationsMap(nodes);
    }, [nodes]);

    return useCallback((nodes, payload, util) => {
        switch (payload.operation) {
            case "remove": {
                for (const nodeId of payload.nodes) {
                    const relatedArrows = relationsMapRef.current[nodeId].map(util.findOne) as ArrowNode[];

                    if (relatedArrows.length === 0) {
                        return nodes;
                    }

                    const removingNode = util.findOne(nodeId);

                    const removingNodeRect = NodeRectsFactory.rect(removingNode);

                    for (const arrow of relatedArrows) {
                        for (const side of ArrowSides) {
                            if (arrow[side].relativeTo === nodeId) {
                                arrow[side] = {
                                    x: removingNodeRect.x + removingNodeRect.width * arrow[side].x,
                                    y: removingNodeRect.y + removingNodeRect.height * arrow[side].y
                                };
                            }
                        }
                    }
                }
                break;
            }
        }

        return nodes;
    }, []);
}
