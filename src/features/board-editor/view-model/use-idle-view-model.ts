import { ViewModel, ViewModelParams } from "./types";
import { switchToStickers } from "./use-stickers-view-model";

export type IdleViewState = {
    type: "idle";
};

export function switchToIdle(): IdleViewState {
    return {
        type: "idle"
    };
}

export function useIdleViewModel({ nodesModel, setViewState }: ViewModelParams) {
    return (): ViewModel => {
        return {
            nodes: nodesModel.nodes,
            actions: {
                idle: {
                    isActive: true
                },
                stickers: {
                    isActive: false,
                    onClick: () => setViewState(switchToStickers())
                }
            }
        };
    };
}
