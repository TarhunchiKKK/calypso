import { useActions } from "../hooks/use-actions";
import { useHotKeys } from "../hooks/use-hotkeys";
import { useSelectionWindow } from "../hooks/use-selection-window";
import { ViewModel, ViewModelParams } from "../types";
import { switchToSelection } from "./use-selection-view-model";

export type IdleViewState = {
    type: "idle";
};

export function switchToIdle(): IdleViewState {
    return {
        type: "idle"
    };
}

export function useIdleViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const { handleHotkeys } = useHotKeys("idle", params);
    const actions = useActions({ type: "idle", setViewState });

    const selectionWindow = useSelectionWindow(params);

    const handleClick = (nodeId: string) => {
        setViewState(switchToSelection(new Set([nodeId])));
    };

    return (): ViewModel => {
        return {
            nodes: nodesModel.nodes.map(node => node.setOnClick(() => handleClick(node.id))),
            layout: {
                onKeyDown: e => {
                    handleHotkeys(e);
                }
            },
            overlay: {
                onMouseDown: selectionWindow.onMouseDown
            },
            window: {
                onMouseMove: selectionWindow.onMouseMove,
                onMouseUp: selectionWindow.onMouseUp
            },
            selectionWindow: selectionWindow.rect,
            actions: actions
        };
    };
}
