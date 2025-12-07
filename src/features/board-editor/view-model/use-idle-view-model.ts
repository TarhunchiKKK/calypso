import { ViewModel, ViewModelParams } from "./types";

export type IdleViewState = {
    type: "idle";
};

export function switchToIdle(): IdleViewState {
    return {
        type: "idle"
    };
}

export function useIdleViewModel({ nodesModel }: ViewModelParams) {
    return (): ViewModel => {
        return {
            nodes: nodesModel.nodes
        };
    };
}
