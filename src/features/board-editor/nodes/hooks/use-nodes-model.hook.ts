import { useState } from "react";
import type { NodeBase } from "../../core";
import { useNodesService } from "./use-nodes-service.hook";

export function useNodesModel(inputNodes: NodeBase[]) {
    const [nodes, setNodes] = useState<NodeBase[]>(inputNodes);

    const nodesService = useNodesService(setNodes);

    return { nodes, service: nodesService };
}

export type NodesModel = ReturnType<typeof useNodesModel>;
