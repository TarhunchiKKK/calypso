import { useActions } from "../hooks/use-actions";
import { useHotKeys } from "../hooks/use-hotkeys";
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

export function useIdleViewModel({ nodesModel, setViewState }: ViewModelParams) {
    const { handleHotkeys } = useHotKeys({ type: "idle", setViewState });
    const actions = useActions({ type: "idle", setViewState });

    const handleClick = (nodeId: string) => {
        console.log("handle");
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
            actions: actions
        };
    };
}
