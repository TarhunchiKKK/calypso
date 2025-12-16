import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../../types";
import { useSelectionWindow } from "../../hooks/use-selection-window";
import { SelectionWindowViewState } from "./view-state";
import { SelectionWindowNodesMapper } from "./helpers";

export function useSelectionWindowViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const selectionWindow = useSelectionWindow(params);

    return (viewState: SelectionWindowViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: SelectionWindowNodesMapper.from(nodesModel.nodes, viewState)
                .applySelection(selectionWindow.selectedNodesIds)
                .get(),
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
