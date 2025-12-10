import { useState } from "react";
import { NodesFactory } from "./compose/nodes-factory";
import { AnyNode } from "./compose/types";
import { NodeImpl } from "./variants/base";

const mockNodes: AnyNode[] = [
    {
        id: crypto.randomUUID(),
        type: "sticker",
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        text: "Hello 1"
    },
    {
        id: crypto.randomUUID(),
        type: "sticker",
        x: 220,
        y: 220,
        width: 150,
        height: 150,
        text: "Hello 2"
    },
    {
        id: crypto.randomUUID(),
        type: "sticker",
        x: 460,
        y: 180,
        width: 100,
        height: 100,
        text: "Hello 3"
    }
];

export function useNodes() {
    const [nodes, setNodes] = useState<NodeImpl[]>(() => mockNodes.map(node => NodesFactory.create(node)));

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
