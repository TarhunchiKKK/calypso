import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../types";
import { useSelectionWindow } from "../hooks/use-selection-window";
import { Point } from "../../domain/geometry";
import { NodesSelectionMode } from "../../domain/selection";

export type SelectionWindowViewState = {
    type: "selection-window";
    startPoint: Point;
    selectedIds: Set<string>;
    selectionMode: NodesSelectionMode;
};

export function switchToSelectionWindow({
    selectedIds,
    startPoint,
    selectionMode
}: {
    selectedIds?: Set<string>;
    startPoint: Point;
    selectionMode: NodesSelectionMode;
}): SelectionWindowViewState {
    return {
        type: "selection-window",
        startPoint: startPoint,
        selectedIds: selectedIds ?? new Set(),
        selectionMode: selectionMode
    };
}

export function useSelectionWindowViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const selectionWindow = useSelectionWindow(params);

    return (viewState: SelectionWindowViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: nodesModel.nodes.map(node => (viewState.selectedIds.has(node.id) ? node.clone().select() : node)),
            window: {
                onMouseMove: e => {
                    selectionWindow.onWindowMouseMove(viewState, e);
                },
                onMouseUp: () => {
                    selectionWindow.onWindowMouseUp(viewState);
                }
            },
            selectionWindow: selectionWindow.rect
        };
    };
}
