import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../../types";
import { useSelectionWindow } from "../../hooks/use-selection-window";
import { SelectionWindowViewState } from "./view-state";

export function useSelectionWindowViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const selectionWindow = useSelectionWindow(params);

    return (viewState: SelectionWindowViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: nodesModel.nodes.map(node =>
                viewState.selectedIds.has(node.id) || selectionWindow.selectedNodesIds.has(node.id)
                    ? node.clone().select()
                    : node
            ),
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
