import type { OmitFields } from "@/shared/lib/typescript";
import type { ViewModel, ViewModelParams } from "../../types";
import { DraggingNodesMapper } from "./nodes-mapping.lib";
import { useDragging } from "./use-dragging.hook";
import type { DraggingViewState } from "./view-state";

export function useDraggingViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const dragging = useDragging(params);

    return (viewState: DraggingViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: DraggingNodesMapper.from(nodesModel.nodes).map(viewState, dragging.offset).get(),
            window: {
                onMouseMove: e => dragging.onWindowMouseMove(viewState, e),
                onMouseUp: () => dragging.onWindowMouseUp(viewState)
            }
        };
    };
}
