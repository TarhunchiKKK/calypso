import { useState } from "react";
import { useNodesService } from "@/entities/nodes";
import type { Boards } from "@repo/common";

export function useNodesModel(inputNodes: Boards.NodeBase[]) {
    const [nodes, setNodes] = useState<Boards.NodeBase[]>(inputNodes);

    const nodesService = useNodesService(setNodes);

    return { nodes, service: nodesService };
}

export type NodesModel = ReturnType<typeof useNodesModel>;
