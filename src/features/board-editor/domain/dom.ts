import React from "react";

export type ResizeDirection = "n" | "s" | "w" | "e" | "nw" | "ne" | "sw" | "se";

function getNodeId(e: React.MouseEvent) {
    const nodeId = (e.target as HTMLElement).getAttribute("data-id");

    if (nodeId) {
        return nodeId;
    }

    const parentNode = (e.target as HTMLElement).closest("[data-id]");

    if (parentNode) {
        return parentNode.getAttribute("data-id");
    }

    return null;
}

export function withNodeId(callback: (nodeId: string, e: React.MouseEvent) => void) {
    return (e: React.MouseEvent) => {
        const nodeId = getNodeId(e);
        if (!nodeId) {
            console.error("Node id not found");
            return;
        }

        callback(nodeId, e);
    };
}
