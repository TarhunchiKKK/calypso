import type { ViewModelHook } from "../../types";
import { DraggingNodesMapper } from "./lib/nodes-mapper";
import { useDragging } from "./lib/use-dragging.hook";
import type { DraggingViewState } from "./view-state";

export const useDraggingViewModel: ViewModelHook<DraggingViewState> = (params) => {
    const { nodesModel } = params;

    const dragging = useDragging(params);

    return (viewState) => {
        return {
            nodes: DraggingNodesMapper.create().setNodes(nodesModel.nodes).setSelectedIds(viewState.nodeIds).setOffset(dragging.offset).map(),
            window: {
                onMouseMove: (e) => dragging.onWindowMouseMove(viewState, e),
                onMouseUp: () => dragging.onWindowMouseUp(viewState)
            }
        };
    };
};
