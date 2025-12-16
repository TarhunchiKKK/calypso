import { useState } from "react";
import { NodesFactory } from "./compose/nodes-factory";
import { AnyNode } from "./compose/types";
import { NodeImpl } from "./variants/base";

export function useNodes(inputNodes: AnyNode[]) {
    const [nodes, setNodes] = useState<NodeImpl[]>(() => inputNodes.map(node => NodesFactory.create(node)));

    const add = (node: NodeImpl) => {
        setNodes(nodes => [...nodes, node]);
    };

    const updateOne = (newNode: NodeImpl) => {
        setNodes(nodes => nodes.map(node => (node.id === newNode.id ? newNode : node)));
    };

    const remove = (id: Set<string>) => {
        setNodes(nodes => nodes.filter(node => !id.has(node.id)));
    };

    return { nodes, setNodes, add, updateOne, remove };
}

export type NodesModel = ReturnType<typeof useNodes>;
