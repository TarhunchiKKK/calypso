import type { ViewModelHook } from "../../types";
import { ResizingNodesMapper } from "./lib/nodes-mapper";
import { useResizing } from "./lib/use-resizing.hook";
import type { ResizingViewState } from "./view-state";

export const useResizingViewModel: ViewModelHook<ResizingViewState> = params => {
    const resizing = useResizing(params);

    return viewState => {
        const { nodesModel } = params;

        return {
            nodes: ResizingNodesMapper.create().setNodes(nodesModel.nodes).setNodeId(viewState.nodeId).setNewSize(resizing.newSize).map(),
            window: {
                onMouseMove: e => resizing.onMouseMove(viewState, e),
                onMouseUp: e => {
                    e.stopPropagation();
                    resizing.onMouseUp(viewState);
                }
            }
        };
    };
};
