import type { NodeBase } from "@repo/common";
import type { Dispatch, SetStateAction } from "react";

export function useNodesService(setNodes: Dispatch<SetStateAction<NodeBase[]>>) {
    const createOne = (node: NodeBase) => {
        setNodes(nodes => [...nodes, node]);
    };

    const updateOne = (newNode: NodeBase) => {
        setNodes(nodes => nodes.map(node => (node.id === newNode.id ? newNode : node)));
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

    return { createOne, updateOne, replaceAll: setNodes, removeOne, removeMany, removeAll };
}
