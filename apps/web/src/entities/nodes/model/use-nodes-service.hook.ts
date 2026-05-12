import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { useState } from "react";
import { type NodesServiceMiddlewarePayload, useNodesServiceMiddleware } from "./use-nodes-service-middleware.hook";

export function useNodesService(inputNodes: NodeBase[]) {
    const [nodes, setNodes] = useState<NodeBase[]>(inputNodes);

    const middleware = useNodesServiceMiddleware();

    const setWithMiddleware = (payload: NodesServiceMiddlewarePayload, updateFn: (prev: NodeBase[]) => NodeBase[]) => {
        setNodes(nodes => {
            const result = middleware.apply(nodes, payload);

            return updateFn(result);
        });
    };

    const createOne = (node: NodeBase) => {
        setWithMiddleware(
            {
                operation: "create",
                nodes: [node]
            },
            nodes => [...nodes, node]
        );
    };

    const createMany = (newNodes: NodeBase[]) => {
        setWithMiddleware(
            {
                operation: "create",
                nodes: newNodes
            },
            nodes => [...nodes, ...newNodes]
        );
    };

    // OPTIMIZE: add map (`Record<Id, NodeBase>`) for less complexity
    const findOne = <T extends NodeBase = NodeBase>(nodeId: Id) => {
        const node = nodes.find(node => node.id === nodeId);

        if (!node) {
            throw new Error(`Node with id=${nodeId} not found`);
        }

        return node as T;
    };

    const updateOne = (newNode: NodeBase) => {
        setWithMiddleware(
            {
                operation: "update",
                nodes: [newNode]
            },
            nodes => nodes.map(node => (node.id === newNode.id ? newNode : node))
        );
    };

    const updateMany = (newNodes: NodeBase[]) => {
        setWithMiddleware(
            {
                operation: "update",
                nodes: newNodes
            },
            nodes => nodes.map(node => {
                const replacementNode = newNodes.find(newNode => newNode.id === node.id);

                if (!replacementNode) {
                    return node;
                }

                return replacementNode
            })
        )
    };

    const updateManyWithFn = (ids: Set<Id>, fn: (node: NodeBase) => NodeBase) => {
        setNodes(nodes => nodes.map(node => (ids.has(node.id) ? fn(node) : node)));
    };

    const removeOne = (id: Id) => {
        setWithMiddleware(
            {
                operation: "remove",
                nodes: [id]
            },
            nodes => nodes.filter(node => node.id !== id)
        );
    };

    const removeMany = (ids: Set<Id>) => {
        setWithMiddleware(
            {
                operation: "remove",
                nodes: Array.from(ids)
            },
            nodes => nodes.filter(node => !ids.has(node.id))
        );
    };

    const removeAll = () => {
        setNodes([]);
    };

    return {
        nodes: nodes,
        createOne,
        createMany,
        findOne,
        updateOne,
        updateMany,
        removeOne,
        updateManyWithFn,
        removeMany,
        removeAll,
        replaceAll: setNodes,
        middleware
    };
}

export type NodesService = ReturnType<typeof useNodesService>;
