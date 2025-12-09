import { OmitFields } from "@/shared/lib/typescript";
import { Point } from "../../domain/geometry";
import { useHotKeys } from "../hooks/use-hot-keys";
import { ViewModel, ViewModelParams } from "../types";

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

    const { handleHotKeys } = useHotKeys(params);

    return (viewState: DraggingViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: nodesModel.nodes.map(node => (viewState.selectedIds.has(node.id) ? node.toSelected() : node)),
            layout: {
                onKeyDown: e => {
                    handleHotKeys(e);
                }
            }
        };
    };
}
