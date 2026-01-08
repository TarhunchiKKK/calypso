import { useState } from "react";
import { AnyNode } from "./compose/types";

export function useNodes(inputNodes: AnyNode[]) {
    const [nodes, setNodes] = useState<AnyNode[]>(inputNodes);

    const add = (node: AnyNode) => {
        setNodes(nodes => [...nodes, node]);
    };

    const updateOne = (newNode: AnyNode) => {
        setNodes(nodes => nodes.map(node => (node.id === newNode.id ? newNode : node)));
    };

    const remove = (ids: Set<string>) => {
        setNodes(nodes => nodes.filter(node => !ids.has(node.id)));
    };

    return { nodes, setNodes, add, updateOne, remove };
}

export type NodesModel = ReturnType<typeof useNodes>;
