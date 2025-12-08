import { useActions } from "../hooks/use-actions";
import { useHotKeys } from "../hooks/use-hotkeys";
import { ViewModel, ViewModelParams } from "../types";

type SelectionMode = "toggle" | "add" | "replace";

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

export function selectNodes(nodeIds: string[], mode: SelectionMode, currentSelection: Set<string>): Set<string> {
    switch (mode) {
        case "replace": {
            return new Set(nodeIds);
        }
        case "add": {
            const newSelection = new Set(currentSelection);
            nodeIds.forEach(id => newSelection.add(id));
            return newSelection;
        }
        case "toggle": {
            const newSelection = new Set(currentSelection);
            nodeIds.forEach(id => {
                if (newSelection.has(id)) {
                    newSelection.delete(id);
                } else {
                    newSelection.add(id);
                }
            });
            return newSelection;
        }
    }
}

export function useSelectionViewModel({ nodesModel, setViewState }: ViewModelParams) {
    const { handleHotkeys } = useHotKeys({ type: "selection", setViewState });
    const actions = useActions({ type: "selection", setViewState });

    return (viewState: SelectionViewState): ViewModel => {
        const handleClick = (nodeId: string, e: React.MouseEvent<HTMLDivElement>) => {
            let selectionMode: SelectionMode;

            if (e.shiftKey || e.ctrlKey) {
                selectionMode = "toggle";
            } else {
                selectionMode = "replace";
            }

            setViewState({
                ...viewState,
                selectedIds: selectNodes([nodeId], selectionMode, viewState.selectedIds)
            });
        };

        console.log(viewState.selectedIds);

        return {
            nodes: nodesModel.nodes
                .map(node => node.setOnClick(handleClick.bind(null, node.id)))
                .map(node => (viewState.selectedIds.has(node.id) ? node.toSelected() : node)),
            layout: {
                onKeyDown: e => {
                    handleHotkeys(e);
                }
            },
            actions: actions
        };
    };
}
