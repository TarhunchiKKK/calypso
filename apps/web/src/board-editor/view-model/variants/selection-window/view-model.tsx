import { SelectionWindow } from "@/board-editor/modules/selection";
import type { ViewModelHook } from "../../types";
import { SelectionWindowNodesMapper } from "./lib/nodes-mapper";
import { useSelectionWindow } from "./lib/use-selection-window.hook";
import type { SelectionWindowViewState } from "./view-state";

export const useSelectionWindowViewModel: ViewModelHook<SelectionWindowViewState> = (params) => {
    const { nodesModel } = params;

    const selectionWindow = useSelectionWindow(params);

    return (viewState) => {
        return {
            nodes: SelectionWindowNodesMapper.create()
                .setNodes(nodesModel.nodes)
                .setSelectedIds(viewState.selectedIds)
                .setSelectionWindowIds(selectionWindow.selectedNodesIds)
                .map(),
            window: {
                onMouseMove: (e) => {
                    selectionWindow.onWindowMouseMove(viewState, e);
                },
                onMouseUp: () => {
                    selectionWindow.onWindowMouseUp(viewState);
                }
            },
            additionalElements: {
                canvas: selectionWindow.rect ? <SelectionWindow rect={selectionWindow.rect} /> : null
            }
        };
    };
};
