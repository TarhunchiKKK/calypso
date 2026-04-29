import type { NodeBase } from "@repo/boards-common";
import type { Point } from "@repo/common";
import { useState } from "react";
import type { NodesService } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";
import { calculateMinPoint } from "./lib/geometry.lib";
import { NodeClonesFactory } from "./lib/node-clones.factory";

export function useExchangeBuffer(service: NodesService) {
    const [selectedNodes, setSelectedNodes] = useState<NodeBase[]>();

    const copy = (nodes: NodeBase[]) => {
        if (nodes.length === 0) {
            return;
        }

        setSelectedNodes(nodes);
    };

    const paste = (pastePoint: Point) => {
        if (!selectedNodes) {
            return;
        }

        const minPoint = calculateMinPoint(selectedNodes);
        const offset = Geometry.calculateOffset(minPoint, pastePoint);

        const shiftedNodes = selectedNodes.map(node => NodeClonesFactory.clone(node, offset));

        service.createMany(shiftedNodes);
    };

    const cut = (nodes: NodeBase[]) => {
        if (nodes.length === 0) {
            return;
        }

        setSelectedNodes(nodes);

        service.removeMany(new Set(nodes.map(node => node.id)));
    };

    return {
        copy,
        paste,
        cut
    };
}
