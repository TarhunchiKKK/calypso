import { useActions } from "./hooks/use-actions";
import { useHotKeys } from "./hooks/use-hotkeys";
import { ViewModel, ViewModelParams } from "./types";

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

    return (): ViewModel => {
        return {
            nodes: nodesModel.nodes,
            layout: {
                onKeyDown: e => {
                    handleHotkeys(e);
                }
            },
            actions: actions
        };
    };
}
