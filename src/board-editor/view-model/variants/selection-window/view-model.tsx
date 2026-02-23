import { SelectionWindow } from "@/board-editor/modules/selection";
import type { OmitFields } from "@/shared/lib/typescript";
import type { ViewModel, ViewModelParams } from "../../types";
import { SelectionWindowNodesMapper } from "./nodes-mapping.lib";
import { useSelectionWindow } from "./use-selection-window.hook";
import type { SelectionWindowViewState } from "./view-state";

export function useSelectionWindowViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const selectionWindow = useSelectionWindow(params);

    return (viewState: SelectionWindowViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: SelectionWindowNodesMapper.from(nodesModel.nodes)
                .setSelectedIds(viewState.selectedIds)
                .setSelectionWindowIds(selectionWindow.selectedNodesIds)
                .get(),
            window: {
                onMouseMove: e => {
                    selectionWindow.onWindowMouseMove(viewState, e);
                },
                onMouseUp: () => {
                    selectionWindow.onWindowMouseUp(viewState);
                }
            },
            additionalElement: selectionWindow.rect ? <SelectionWindow {...selectionWindow.rect} /> : null
        };
    };
}
