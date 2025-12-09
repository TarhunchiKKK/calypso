import { OmitFields } from "@/shared/lib/typescript";
import { selectNodes } from "../../domain/selection";
import { useHotKeys } from "../hooks/use-hot-keys";
import { useSelectionWindow } from "../hooks/use-selection-window";
import { ViewModel, ViewModelParams } from "../types";
import { Rect } from "../../domain/geometry";
import { useDragging } from "../hooks/use-dragging";

export type SelectionViewState = {
    type: "selection";
    selectedIds: Set<string>;
    selectionWindow?: Rect;
    skipNextClick?: boolean;
};

export function switchToSelection({
    selectedIds,
    selectionWindow,
    skipNextClick
}: Partial<SelectionViewState> = {}): SelectionViewState {
    return {
        type: "selection",
        selectedIds: selectedIds ?? new Set(),
        selectionWindow: selectionWindow,
        skipNextClick: skipNextClick
    };
}

export function useSelectionViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const { handleHotKeys } = useHotKeys(params);

    const selectionWindow = useSelectionWindow(params);

    const dragging = useDragging(params);

    return (viewState: SelectionViewState): OmitFields<ViewModel, "actions"> => {
        const handleNodeClick = (nodeId: string, e: React.MouseEvent<HTMLDivElement>) => {
            if (viewState.skipNextClick) {
                setViewState({ ...viewState, skipNextClick: undefined });
                return;
            }

            const selectionMode = e.shiftKey || e.ctrlKey ? "toggle" : "replace";

            setViewState({
                ...viewState,
                selectedIds: selectNodes([nodeId], selectionMode, viewState.selectedIds)
            });
        };

        return {
            nodes: nodesModel.nodes
                .map(node => node.clone())
                .map(node =>
                    viewState.selectedIds.has(node.id) || selectionWindow.selectedNodesIds.has(node.id)
                        ? node.select()
                        : node
                )
                .map(node => node.setOnClick(handleNodeClick.bind(null, node.id)).setOnMouseDown(dragging.onMouseDown)),
            layout: {
                onKeyDown: e => {
                    handleHotKeys(e);
                }
            },
            overlay: {
                onMouseDown: selectionWindow.onMouseDown
            },
            window: {
                onMouseMove: e => {
                    selectionWindow.onMouseMove(viewState, e);
                    dragging.onMouseMove(viewState, e);
                },
                onMouseUp: () => {
                    selectionWindow.onMouseUp(viewState);
                    dragging.onMouseUp(viewState);
                }
            },
            selectionWindow: selectionWindow.rect
        };
    };
}
