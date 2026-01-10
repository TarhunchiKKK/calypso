import { useState } from "react";
import { AnyNode } from "../compose/types";
import { useNodesService } from "./use-nodes-service.hook";

export function useNodesModel(inputNodes: AnyNode[]) {
    const [nodes, setNodes] = useState<AnyNode[]>(inputNodes);

    const nodesService = useNodesService(setNodes);

    return { nodes, service: nodesService };
}

export type NodesModel = ReturnType<typeof useNodesModel>;
