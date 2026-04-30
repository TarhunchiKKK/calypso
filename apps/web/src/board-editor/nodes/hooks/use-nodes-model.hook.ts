import type { NodeBase } from "@repo/boards-common";
import { useState } from "react";
import { useCancellationDecorator } from "@/board-editor/modules/cancellation";
import { useExchangeBuffer } from "@/board-editor/modules/exchange-buffer";
import { useNodesService } from "@/entities/nodes";

export function useNodesModel(inputNodes: NodeBase[]) {
    const [nodes, setNodes] = useState<NodeBase[]>(inputNodes);

    const nodesService = useNodesService(nodes, setNodes);

    const withCancellation = useCancellationDecorator(nodes, nodesService);

    const exchangeBuffer = useExchangeBuffer(nodes, withCancellation.service);

    return {
        nodes,
        service: nodesService,
        exchangeBuffer: exchangeBuffer,
        cancellation: withCancellation.cancellation
    };
}

export type NodesModel = ReturnType<typeof useNodesModel>;
