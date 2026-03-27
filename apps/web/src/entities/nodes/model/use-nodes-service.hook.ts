import type { Boards, Id } from "@repo/common";
import type { Dispatch, SetStateAction } from "react";

export function useNodesService(setNodes: Dispatch<SetStateAction<Boards.NodeBase[]>>) {
    const createOne = (node: Boards.NodeBase) => {
        setNodes(nodes => [...nodes, node]);
    };

    const updateOne = (newNode: Boards.NodeBase) => {
        setNodes(nodes => nodes.map(node => (node.id === newNode.id ? newNode : node)));
    };

    const updateManyWithFn = (ids: Set<Id>, fn: (node: Boards.NodeBase) => Boards.NodeBase) => {
        setNodes(nodes => nodes.map(node => (ids.has(node.id) ? fn(node) : node)));
    };

    const removeOne = (id: Id) => {
        setNodes(nodes => nodes.filter(node => node.id !== id));
    };

    const removeMany = (ids: Set<Id>) => {
        setNodes(nodes => nodes.filter(node => !ids.has(node.id)));
    };

    const removeAll = () => {
        setNodes([]);
    };

    return { createOne, updateOne, replaceAll: setNodes, removeOne, updateManyWithFn, removeMany, removeAll };
}

export type NodesService = ReturnType<typeof useNodesService>;
