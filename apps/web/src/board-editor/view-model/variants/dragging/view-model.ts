import type { DecoratableViewModel } from "../../decorators";
import type { ViewModelParams } from "../../types";
import { DraggingNodesMapper } from "./lib/nodes-mapper";
import { useDragging } from "./lib/use-dragging.hook";
import type { DraggingViewState } from "./view-state";

export function useDraggingViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const dragging = useDragging(params);

    return (viewState: DraggingViewState): DecoratableViewModel => {
        return {
            nodes: DraggingNodesMapper.create().setNodes(nodesModel.nodes).setSelectedIds(viewState.selectedIds).setOffset(dragging.offset).map(),
            window: {
                onMouseMove: e => dragging.onWindowMouseMove(viewState, e),
                onMouseUp: () => dragging.onWindowMouseUp(viewState)
            }
        };
    };
}
