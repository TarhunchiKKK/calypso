import type { Point } from "@/shared/lib/geometry";
import type { NodesContextMenuViewState } from "./view-state";

type Params = {
    selectedIds: Set<string>;

    position: Point;
};

export function switchToNodesContextMenu(params: Params): NodesContextMenuViewState {
    return {
        ...params,
        type: "nodes-context-menu"
    };
}
