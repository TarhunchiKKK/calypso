import type { NodeBase } from "@repo/boards-common";
import { useState } from "react";
import type { NodesService } from "@/entities/nodes";

export function useExchangeBuffer(service: NodesService) {
    const [data, setData] = useState<NodeBase[]>();

    const copy = (nodes: NodeBase[]) => {
        if (nodes.length === 0) {
            return;
        }

        setData(nodes);
    };

    const paste = () => {
        if (!data) {
            return;
        }

        service.createMany(data);
    };

    const cut = (nodes: NodeBase[]) => {
        const nodeIds = nodes.map(node => node.id);

        service.removeMany(new Set(nodeIds));

        setData(nodes);
    };

    return {
        copy,
        paste,
        cut
    };
}
