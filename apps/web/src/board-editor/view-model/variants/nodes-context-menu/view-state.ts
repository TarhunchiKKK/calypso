import type { Id, Point } from "@repo/common";

export type NodesContextMenuViewState = {
    type: "nodes-context-menu";

    nodeIds: Set<Id>;

    position: Point;
};
