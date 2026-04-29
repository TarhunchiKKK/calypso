import type { NodeBase } from "@repo/boards-common";
import { useState } from "react";
import { useExchangeBuffer } from "@/board-editor/modules/exchange-buffer";
import { useNodesService } from "@/entities/nodes";

export function useNodesModel(inputNodes: NodeBase[]) {
    const [nodes, setNodes] = useState<NodeBase[]>(inputNodes);

    const nodesService = useNodesService(nodes, setNodes);

    const exchangeBuffer = useExchangeBuffer(nodes, nodesService);

    return { nodes, service: nodesService, exchangeBuffer: exchangeBuffer };
}

export type NodesModel = ReturnType<typeof useNodesModel>;
