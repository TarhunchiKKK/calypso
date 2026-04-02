import type { Boards, Id } from "@repo/common";
import type { Dispatch, SetStateAction } from "react";
import { type NodesServiceMiddlewarePayload, useNodesServiceMiddleware } from "./use-nodes-service-middleware.hook";

export function useNodesService(setNodes: Dispatch<SetStateAction<Boards.NodeBase[]>>) {
    const middleware = useNodesServiceMiddleware();

    const setWithMiddleware = (
        payload: NodesServiceMiddlewarePayload,
        updateFn: (prev: Boards.NodeBase[]) => Boards.NodeBase[]
    ) => {
        setNodes(nodes => {
            const result = middleware.apply(nodes, payload);

            return updateFn(result);
        });
    };

    const createOne = (node: Boards.NodeBase) => {
        setWithMiddleware(
            {
                operation: "create",
                nodes: [node]
            },
            nodes => [...nodes, node]
        );
    };

    const updateOne = (newNode: Boards.NodeBase) => {
        setWithMiddleware(
            {
                operation: "update",
                nodes: [newNode]
            },
            nodes => nodes.map(node => (node.id === newNode.id ? newNode : node))
        );
    };

    const updateManyWithFn = (ids: Set<Id>, fn: (node: Boards.NodeBase) => Boards.NodeBase) => {
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
        createOne,
        updateOne,
        replaceAll: setNodes,
        removeOne,
        updateManyWithFn,
        removeMany,
        removeAll,
        middleware
    };
}

export type NodesService = ReturnType<typeof useNodesService>;
