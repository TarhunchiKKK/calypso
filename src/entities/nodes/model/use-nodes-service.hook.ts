import type { Dispatch, SetStateAction } from "react";
import type { NodeBase } from "@/entities/nodes";

export function useNodesService(setNodes: Dispatch<SetStateAction<NodeBase[]>>) {
    const createOne = (node: NodeBase) => {
        setNodes(nodes => [...nodes, node]);
    };

    const updateOne = (newNode: NodeBase) => {
        setNodes(nodes => nodes.map(node => (node.id === newNode.id ? newNode : node)));
    };

    const updateManyWithFn = (ids: Set<string>, fn: (node: NodeBase) => NodeBase) => {
        setNodes(nodes => nodes.map(node => (ids.has(node.id) ? fn(node) : node)));
    };

    const removeOne = (id: string) => {
        setNodes(nodes => nodes.filter(node => node.id !== id));
    };

    const removeMany = (ids: Set<string>) => {
        setNodes(nodes => nodes.filter(node => !ids.has(node.id)));
    };

    const removeAll = () => {
        setNodes([]);
    };

    return { createOne, updateOne, replaceAll: setNodes, removeOne, updateManyWithFn, removeMany, removeAll };
}

export type NodesService = ReturnType<typeof useNodesService>;
