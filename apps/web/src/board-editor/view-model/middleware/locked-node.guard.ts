import type { Id } from "@repo/common";
import type { ViewStateGuard } from "../hooks/use-view-state-mediator.hook";
import type { NodesModel } from "@/board-editor/nodes";

export const LOCKED_NODES_GUARD_KEY = Symbol();

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
            return !areNodesLocked(nodesModel, next.selectedIds);
        case "editing":
            return !isNodeLocked(nodesModel, next.selectedNodeId);
        case "resizing":
            return !isNodeLocked(nodesModel, next.nodeId);
        case "styling":
            return !areNodesLocked(nodesModel, next.selectedIds);
        case "nodes-context-menu":
            return !areNodesLocked(nodesModel, next.selectedIds);
        default:
            return true;
    }
};
