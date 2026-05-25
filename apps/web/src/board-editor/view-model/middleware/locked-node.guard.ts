import type { Id } from "@repo/common";
import type { NodesModel } from "@/board-editor/nodes";
import type { ViewStateGuard } from "../hooks/use-view-state-mediator.hook";

function isNodeLocked(nodesModel: NodesModel, nodeId: Id) {
    const node = nodesModel.service.findOne(nodeId);
    return !!node && node.locked;
}

function areNodesLocked(nodesModel: NodesModel, nodeIds: Set<Id>) {
    return nodesModel.nodes.filter((n) => nodeIds.has(n.id)).every((node) => node.locked);
}

export const LockedNodesGuard: ViewStateGuard = (nodesModel, next) => {
    switch (next.type) {
        case "dragging":
            return !areNodesLocked(nodesModel, next.nodeIds);
        case "editing":
            return !isNodeLocked(nodesModel, next.nodeId);
        case "resizing":
            return !isNodeLocked(nodesModel, next.nodeId);
        case "styling":
            return !areNodesLocked(nodesModel, next.nodeIds);
        case "nodes-context-menu":
            return !areNodesLocked(nodesModel, next.nodeIds);
        default:
            return true;
    }
};
