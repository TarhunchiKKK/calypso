import type { Id, Point } from "@repo/common";

export type NodesContextMenuViewState = {
    type: "nodes-context-menu";

    selectedIds: Set<Id>;

    position: Point;
};
