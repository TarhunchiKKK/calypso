import { useState } from "react";
import { NodesFactory } from "./compose/nodes-factory";
import { NodeImpl } from "./types";
import { AnyNode } from "./compose/types";

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
        x: 200,
        y: 200,
        width: 150,
        height: 150,
        text: "Hello 2"
    }
];

export function useNodes() {
    const [nodes] = useState<NodeImpl[]>(() => mockNodes.map(node => NodesFactory.create(node)));

    return { nodes };
}
