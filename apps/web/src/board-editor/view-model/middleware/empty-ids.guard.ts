import type { ViewStateGuard } from "../hooks/use-view-state-mediator.hook";
import { ViewStateTypeGuards } from "../types";

export const EmptyIdsGuard: ViewStateGuard = (_, next, prev) => {
    if (!ViewStateTypeGuards.multipleNodes(next)) {
        return true;
    }

    switch (next.type) {
        case "dragging":
        case "nodes-context-menu":
        case "styling":
            return next.nodeIds.size !== 0;
        case "selection-window":
            return true;
        case "selection":
            if (next.nodeIds.size !== 0) {
                return true;
            }

            return prev.type === "selection-window";
        default:
            throw new Error(`Unknown view state: ${next satisfies { type: never }} `);
    }
};
