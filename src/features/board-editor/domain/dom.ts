import React from "react";

export type ResizeDirection = "n" | "s" | "w" | "e" | "nw" | "ne" | "sw" | "se";

export function getNodeId(e: React.MouseEvent) {
    const nodeId = (e.target as HTMLElement).getAttribute("data-id");

    if (nodeId) {
        return nodeId;
    }

    const parentNode = (e.target as HTMLElement).closest("[data-id]");

    if (parentNode) {
        return parentNode.getAttribute("data-id");
    }

    console.error("Node id not found: " + e);

    return null;
}

export function withNodeId(callback: (nodeId: string, e: React.MouseEvent) => void) {
    return (e: React.MouseEvent) => {
        const nodeId = getNodeId(e);
        if (!nodeId) {
            return;
        }

        callback(nodeId, e);
    };
}
