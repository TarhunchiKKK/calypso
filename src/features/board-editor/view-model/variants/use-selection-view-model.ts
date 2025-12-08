import { selectNodes } from "../../domain/selection";
import { useActions } from "../hooks/use-actions";
import { useHotKeys } from "../hooks/use-hotkeys";
import { ViewModel, ViewModelParams } from "../types";

export type SelectionViewState = {
    type: "selection";
    selectedIds: Set<string>;
};

export function switchToSelection(selectedIds?: Set<string>): SelectionViewState {
    return {
        type: "selection",
        selectedIds: selectedIds ?? new Set()
    };
}

export function useSelectionViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const { handleHotkeys } = useHotKeys("selection", params);
    const actions = useActions({ type: "selection", setViewState });

    return (viewState: SelectionViewState): ViewModel => {
        const handleClick = (nodeId: string, e: React.MouseEvent<HTMLDivElement>) => {
            const selectionMode = e.shiftKey || e.ctrlKey ? "toggle" : "replace";

            setViewState({
                ...viewState,
                selectedIds: selectNodes([nodeId], selectionMode, viewState.selectedIds)
            });
        };

        return {
            nodes: nodesModel.nodes
                .map(node => (viewState.selectedIds.has(node.id) ? node.toSelected() : node))
                .map(node => node.setOnClick(handleClick.bind(null, node.id))),
            layout: {
                onKeyDown: e => {
                    handleHotkeys(e);
                }
            },
            actions: actions
        };
    };
}
