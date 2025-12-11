import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../types";
import { useSelectionWindow } from "../hooks/use-selection-window";
import { Point } from "../../domain/geometry";

export type SelectionWindowViewState = {
    type: "selection-window";
    startPoint: Point;
    selectedIds: Set<string>;
};

export function switchToSelectionWindow({
    selectedIds,
    startPoint
}: {
    selectedIds?: Set<string>;
    startPoint: Point;
}): SelectionWindowViewState {
    return {
        type: "selection-window",
        startPoint: startPoint,
        selectedIds: selectedIds ?? new Set()
    };
}

export function useSelectionWindowViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const selectionWindow = useSelectionWindow(params);
    console.log(selectionWindow);

    return (viewState: SelectionWindowViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: nodesModel.nodes,
            layout: {},
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
