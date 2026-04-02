import type { Id, Point } from "@repo/common";
import type { NodesContextMenuViewState } from "./view-state";

type Params = {
    selectedIds: Set<Id>;

    position: Point;
};

export function switchToNodesContextMenu(params: Params): NodesContextMenuViewState {
    return {
        ...params,
        type: "nodes-context-menu"
    };
}
