import { OmitFields } from "@/shared/lib/typescript.lib";
import { ViewModel, ViewModelParams } from "../../types";
import { useDragging } from "../../hooks/use-dragging.hook";
import { DraggingViewState } from "./view-state";
import { DraggingNodesMapper } from "./nodes-mapper.lib";

export function useDraggingViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const dragging = useDragging(params);

    return (viewState: DraggingViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: DraggingNodesMapper.from(nodesModel.nodes, viewState).applyOffset(dragging.offset).get(),
            window: {
                onMouseMove: e => dragging.onWindowMouseMove(viewState, e),
                onMouseUp: () => dragging.onWindowMouseUp(viewState)
            }
        };
    };
}
