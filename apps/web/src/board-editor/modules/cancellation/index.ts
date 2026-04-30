import type { NodeBase } from "@repo/boards-common";
import { useState } from "react";
import type { NodesService } from "@/entities/nodes";

type Callback = () => void;

export function useCancellation(nodes: NodeBase[], service: NodesService) {
    const [undoArray, setUndoArray] = useState<Callback[]>([]);
}
