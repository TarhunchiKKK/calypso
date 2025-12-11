import { OmitFields } from "@/shared/lib/typescript";
import { Geometry } from "../../../domain/geometry";
import { ViewModel, ViewModelParams } from "../../types";
import { useDragging } from "../../hooks/use-dragging";
import { DraggingViewState } from "./view-state";

export function useDraggingViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const dragging = useDragging(params);

    return (viewState: DraggingViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: nodesModel.nodes
                .map(node => node.clone())
                .map(node =>
                    viewState.selectedIds.has(node.id)
                        ? node.select().moveTo(Geometry.applyOffset(node.rect(), dragging.offset))
                        : node
                ),
            window: {
                onMouseMove: e => dragging.onWindowMouseMove(viewState, e),
                onMouseUp: () => dragging.onWindowMouseUp(viewState)
            }
        };
    };
}
