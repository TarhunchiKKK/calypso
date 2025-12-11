import { OmitFields } from "@/shared/lib/typescript";
import { Geometry, Point } from "../../domain/geometry";
import { ViewModel, ViewModelParams } from "../types";
import { useDragging } from "../hooks/use-dragging";

export type DraggingViewState = {
    type: "dragging";
    selectedIds: Set<string>;
    startPoint?: Point;
};

export function switchToDragging({ startPoint, selectedIds }: Partial<DraggingViewState> = {}): DraggingViewState {
    return {
        type: "dragging",
        startPoint: startPoint,
        selectedIds: selectedIds ?? new Set()
    };
}

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
