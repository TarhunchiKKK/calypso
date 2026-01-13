import { useState } from "react";
import { useNodesService } from "./use-nodes-service.hook";
import type { NodeBase } from "../../core";

export function useNodesModel(inputNodes: NodeBase[]) {
    const [nodes, setNodes] = useState<NodeBase[]>(inputNodes);

    const nodesService = useNodesService(setNodes);

    return { nodes, service: nodesService };
}

export type NodesModel = ReturnType<typeof useNodesModel>;
