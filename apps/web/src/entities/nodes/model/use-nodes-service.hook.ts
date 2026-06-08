import type { NodeBase } from "@lib/boards";
import type { Id, OmitFields } from "@repo/common";
import { useState } from "react";
import { useEntitiesMap } from "@/shared/model";
import { type NodesServiceMapper, useNodesServiceMappers } from "./use-nodes-service-mappers.hook";
import { type NodesServiceMiddlewarePayload, useNodesServiceMiddleware } from "./use-nodes-service-middleware.hook";

export function useNodesService(inputNodes: NodeBase[], defaultMappers: Map<string | symbol, NodesServiceMapper> = new Map()) {
    const [nodes, setNodes] = useState<NodeBase[]>(inputNodes);

    const middleware = useNodesServiceMiddleware();

    const mappers = useNodesServiceMappers(defaultMappers);

    const nodesMap = useEntitiesMap(nodes);

    const findOne = <T extends NodeBase = NodeBase>(nodeId: Id) => {
        const node = nodesMap.findOne(nodeId);

        if (!node) {
            throw new Error(`Node with id=${nodeId} not found`);
        }

        return node as T;
    };

    const setWithMiddleware = (payload: NodesServiceMiddlewarePayload, updateFn: (prev: NodeBase[]) => NodeBase[]) => {
        setNodes((nodes) => {
            const result = middleware.apply(nodes, payload, {
                findOne: findOne
            });

            return updateFn(result);
        });
    };

    const createOne = (node: NodeBase) => {
        setWithMiddleware(
            {
                operation: "create",
                nodes: [node]
            },
            (nodes) => [...nodes, node]
        );
    };

    const createMany = (newNodes: NodeBase[]) => {
        setWithMiddleware(
            {
                operation: "create",
                nodes: newNodes
            },
            (nodes) => [...nodes, ...newNodes]
        );
    };

    const updateOne = (newNode: NodeBase) => {
        setWithMiddleware(
            {
                operation: "update",
                nodes: [newNode]
            },
            (nodes) => nodes.map((node) => (node.id === newNode.id ? newNode : node))
        );
    };

    const updateMany = (newNodes: NodeBase[]) => {
        setWithMiddleware(
            {
                operation: "update",
                nodes: newNodes
            },
            (nodes) =>
                nodes.map((node) => {
                    const replacementNode = newNodes.find((newNode) => newNode.id === node.id);

                    if (!replacementNode) {
                        return node;
                    }

                    return replacementNode;
                })
        );
    };

    const updateManyWithFn = (ids: Set<Id>, fn: (node: NodeBase) => NodeBase) => {
        setNodes((nodes) => nodes.map((node) => (ids.has(node.id) ? fn(node) : node)));
    };

    const removeOne = (id: Id) => {
        setWithMiddleware(
            {
                operation: "remove",
                nodes: [id]
            },
            (nodes) => nodes.filter((node) => node.id !== id)
        );
    };

    const removeMany = (ids: Set<Id>) => {
        setWithMiddleware(
            {
                operation: "remove",
                nodes: Array.from(ids)
            },
            (nodes) => nodes.filter((node) => !ids.has(node.id))
        );
    };

    const removeAll = () => {
        setNodes([]);
    };

    return {
        nodes: mappers.apply(nodes, { findOne }),
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
        middleware: middleware as OmitFields<ReturnType<typeof useNodesServiceMiddleware>, "apply">,
        mappers: mappers as OmitFields<ReturnType<typeof useNodesServiceMappers>, "apply">
    };
}

export type NodesService = ReturnType<typeof useNodesService>;
