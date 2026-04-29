import type { NodeBase } from "@repo/boards-common";
import type { Id, Point } from "@repo/common";
import { useState } from "react";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/factories/node-wrappers.factory";
import type { NodesService } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";
import { calculateMiddlePoint } from "../lib/geometry.lib";
import { NodeClonesFactory } from "../lib/node-clones.factory";

export function useExchangeBuffer(nodes: NodeBase[], service: NodesService) {
    const [selectedNodes, setSelectedNodes] = useState<NodeBase[]>();

    const copy = (nodeIds: Set<Id>) => {
        if (nodes.length === 0) {
            return;
        }

        const nodesWithResolvedPositions = nodes
            .filter(node => nodeIds.has(node.id))
            .map(node => NodeWrappersFactory.wrap(nodes, node))
            .map(wrapper => wrapper.data);

        setSelectedNodes(nodesWithResolvedPositions);
    };

    const paste = (pastePoint: Point) => {
        if (!selectedNodes) {
            return;
        }

        const middlePoint = calculateMiddlePoint(selectedNodes);
        const offset = Geometry.calculateOffset(middlePoint, pastePoint);

        console.log("Middle: ", middlePoint);
        console.log("Paste: ", pastePoint);
        console.log("Offset: ", offset);
        // console.log("Selected: ", (selectedNodes[0] as StickerNode).rect);
        console.log("********************");

        const shiftedNodes = selectedNodes.map(node => NodeClonesFactory.clone(node, offset));

        service.createMany(shiftedNodes);
    };

    const cut = (nodeIds: Set<Id>) => {
        copy(nodeIds);

        service.removeMany(new Set(nodes.map(node => node.id)));
    };

    return {
        copy,
        paste,
        cut
    };
}
