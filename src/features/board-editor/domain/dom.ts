import React from "react";

export type ResizeDirection = "n" | "s" | "w" | "e" | "nw" | "ne" | "sw" | "se";

/**
 * Extracts a node's ID from a mouse event by looking for a `data-id` attribute.
 * It first checks the event's target element and then traverses up the DOM tree
 * to find the closest ancestor with the `data-id` attribute.
 *
 * @param e - The React mouse event from which to extract the node ID.
 * @returns The node ID if found, otherwise `null`.
 */
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

/**
 * A higher-order function that wraps a mouse event callback and provides it with the ID of the node
 * that was interacted with. It simplifies event handling by abstracting away the logic
 * of finding the node ID from the DOM.
 *
 * @param callback - A function to be called with the node ID and the original event.
 * @returns An event handler that extracts the node ID before invoking the callback.
 */
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
