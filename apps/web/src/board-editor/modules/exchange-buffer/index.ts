import type { NodeBase } from "@repo/boards";
import type { Id, Point } from "@repo/common";
import { useState } from "react";
import { toast } from "sonner";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import type { NodesService } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";
import { calculateMiddlePoint } from "./geometry.lib";
import { NodeClonesFactory } from "./node-clones.factory";

export function useExchangeBuffer(service: NodesService) {
    const [selectedNodes, setSelectedNodes] = useState<NodeBase[]>();

    const copy = (nodeIds: Set<Id>) => {
        if (service.nodes.length === 0) {
            toast.warning("No nodes selected");
            return;
        }

        // BUG: arrows potentially will lose positions
        const nodesWithResolvedPositions = service.nodes
            .filter((node) => nodeIds.has(node.id))
            .map((node) => NodeWrappersFactory.wrap(node))
            .map((wrapper) => wrapper.data);

        setSelectedNodes(nodesWithResolvedPositions);

        toast.info("Nodes copied");
    };

    const paste = (pastePoint: Point) => {
        if (!selectedNodes) {
            toast.warning("No nodes selected");
            return;
        }

        const middlePoint = calculateMiddlePoint(selectedNodes);
        const offset = Geometry.calculateOffset(middlePoint, pastePoint);

        const shiftedNodes = selectedNodes.map((node) => NodeClonesFactory.clone(node, offset));

        service.createMany(shiftedNodes);
    };

    const cut = (nodeIds: Set<Id>) => {
        copy(nodeIds);

        service.removeMany(nodeIds);
    };

    return {
        copy,
        paste,
        cut,
        empty: !selectedNodes || selectedNodes.length === 0
    };
}
