import type { Point } from "@/shared/lib/geometry";

export type NodesContextMenuViewState = {
    type: "nodes-context-menu";

    selectedIds: Set<string>;

    position: Point;
};
