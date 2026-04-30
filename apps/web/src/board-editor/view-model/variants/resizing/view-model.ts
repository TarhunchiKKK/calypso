import type { DecoratableViewModel } from "../../decorators";
import type { ViewModelParams } from "../../types";
import { ResizingNodesMapper } from "./lib/nodes-mapper";
import { useResizing } from "./lib/use-resizing.hook";
import type { ResizingViewState } from "./view-state";

export function useResizingViewModel(params: ViewModelParams) {
    const resizing = useResizing(params);

    return (viewState: ResizingViewState): DecoratableViewModel => {
        const { nodesModel } = params;

        return {
            nodes: ResizingNodesMapper.from(nodesModel.nodes, viewState.nodeId, resizing.newSize)
                .setNodeId(viewState.nodeId)
                .setNewSize(resizing.newSize)
                .map(),
            window: {
                onMouseMove: e => resizing.onMouseMove(viewState, e),
                onMouseUp: e => {
                    e.stopPropagation();
                    resizing.onMouseUp(viewState);
                }
            }
        };
    };
}
