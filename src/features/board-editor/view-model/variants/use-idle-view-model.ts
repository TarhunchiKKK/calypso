import { OmitFields } from "@/shared/lib/typescript";
import { useHotKeys } from "../hooks/use-hot-keys";
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

    const { handleHotKeys } = useHotKeys(params);

    const selectionWindow = useSelectionWindow(params);

    const handleClick = (nodeId: string) => {
        setViewState(switchToSelection(new Set([nodeId])));
    };

    console.log("idle:   " + selectionWindow.rect);

    return (): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: nodesModel.nodes.map(node => node.setOnClick(() => handleClick(node.id))),
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
            }
        };
    };
}
