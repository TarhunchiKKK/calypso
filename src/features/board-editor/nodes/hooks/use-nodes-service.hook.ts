import { Dispatch, SetStateAction } from "react";
import { AnyNode } from "../compose/types";

export function useNodesService(setNodes: Dispatch<SetStateAction<AnyNode[]>>) {
    const createOne = (node: AnyNode) => {
        setNodes(nodes => [...nodes, node]);
    };

    const updateOne = (newNode: AnyNode) => {
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

    return { createOne, updateOne, replaceAl: setNodes, removeOne, removeMany, removeAll };
}

export type NodesService = ReturnType<typeof useNodesService>;
