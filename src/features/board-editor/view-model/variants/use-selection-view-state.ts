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

export function useSelectionViewModel({ nodesModel, setViewState }: ViewModelParams) {
    const { handleHotkeys } = useHotKeys({ type: "selection", setViewState });
    const actions = useActions({ type: "selection", setViewState });

    const handleClick = (nodeId: string) => {
        console.log(nodeId);
    };

    return (viewState: SelectionViewState): ViewModel => {
        return {
            nodes: nodesModel.nodes
                .map(node => (viewState.selectedIds.has(node.id) ? node.toSelected() : node))
                .map(node => node.setOnClick(() => handleClick(node.id))),
            layout: {
                onKeyDown: e => {
                    handleHotkeys(e);
                }
            },
            actions: actions
        };
    };
}
