import { OmitFields } from "@/shared/lib/typescript";
import { selectNodes } from "../../domain/selection";
import { useHotKeys } from "../hooks/use-hot-keys";
import { useSelectionWindow } from "../hooks/use-selection-window";
import { ViewModel, ViewModelParams } from "../types";
import { Rect } from "../../domain/geometry";

export type SelectionViewState = {
    type: "selection";
    selectedIds: Set<string>;
    selectionWindow?: Rect;
};

export function switchToSelection({
    selectedIds,
    selectionWindow
}: Partial<SelectionViewState> = {}): SelectionViewState {
    return {
        type: "selection",
        selectedIds: selectedIds ?? new Set(),
        selectionWindow: selectionWindow
    };
}

export function useSelectionViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const { handleHotKeys } = useHotKeys(params);

    const selectionWindow = useSelectionWindow(params);

    // const dragging = useDragging(params);

    return (viewState: SelectionViewState): OmitFields<ViewModel, "actions"> => {
        const handleMouseDown = (nodeId: string, e: React.MouseEvent<HTMLDivElement>) => {
            const selectionMode = e.shiftKey || e.ctrlKey ? "toggle" : "replace";

            console.log(selectionMode);
            setViewState({
                ...viewState,
                selectedIds: selectNodes([nodeId], selectionMode, viewState.selectedIds)
            });
        };

        return {
            nodes: nodesModel.nodes
                .map(node => (viewState.selectedIds.has(node.id) ? node.toSelected() : node))
                .map(node => (selectionWindow.selectedNodesIds.has(node.id) ? node.toSelected() : node))
                .map(node => node.setOnMouseDown(handleMouseDown.bind(null, node.id))),
            layout: {
                onKeyDown: e => {
                    handleHotKeys(e);
                }
            },
            overlay: {
                onMouseDown: selectionWindow.onMouseDown
            },
            window: {
                onMouseMove: selectionWindow.onMouseMove,
                onMouseUp: selectionWindow.onMouseUp
            },
            selectionWindow: selectionWindow.rect
        };
    };
}
