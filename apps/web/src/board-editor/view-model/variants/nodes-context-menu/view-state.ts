import type { Id, Point } from "@lib/common";

export type NodesContextMenuViewState = {
    type: "nodes-context-menu";

    nodeIds: Set<Id>;

    position: Point;
};
