import { useState } from "react";
import { AnyNode } from "./compose/types";
import { NodeWrapper } from "./variants/base";

export function useNodes(inputNodes: AnyNode[]) {
    const [nodes, setNodes] = useState<AnyNode[]>(inputNodes);

    const add = (node: NodeWrapper<AnyNode>) => {
        setNodes(nodes => [...nodes, node.data]);
    };

    const updateOne = (newNode: NodeWrapper<AnyNode>) => {
        setNodes(nodes => nodes.map(node => (node.id === newNode.id ? newNode.data : node)));
    };

    const remove = (id: Set<string>) => {
        setNodes(nodes => nodes.filter(node => !id.has(node.id)));
    };

    return { nodes, setNodes, add, updateOne, remove };
}

export type NodesModel = ReturnType<typeof useNodes>;
