import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";
import type { ViewStateGuard } from "../hooks/use-view-state-mediator.hook";

export const LOCKED_NODES_GUARD_KEY = Symbol();

function isNodeLocked(nodes: NodeBase[], nodeId: Id) {
    const node = nodes.find(n => n.id === nodeId);

    return !!node && node.locked;
}

function areNodesLocked(nodes: NodeBase[], nodeIds: Set<Id>) {
    return nodes.filter(n => nodeIds.has(n.id)).every(node => node.locked);
}

export const LockedNodesGuard: ViewStateGuard = (nodes, next) => {
    switch (next.type) {
        case "dragging":
            return !areNodesLocked(nodes, next.selectedIds);
        case "editing":
            return !isNodeLocked(nodes, next.selectedNodeId);
        case "resizing":
            return !isNodeLocked(nodes, next.nodeId);
        case "styling":
            return !areNodesLocked(nodes, next.selectedIds);
        case "nodes-context-menu":
            return !areNodesLocked(nodes, next.selectedIds);
        default:
            return true;
    }
};
