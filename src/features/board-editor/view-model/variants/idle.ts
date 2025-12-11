import { OmitFields } from "@/shared/lib/typescript";
import { useSelectionWindow } from "../hooks/use-selection-window";
import { ViewModel, ViewModelParams } from "../types";
import { switchToSelection } from "./selection";

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

    const selectionWindow = useSelectionWindow(params);

    return (viewState: IdleViewState): OmitFields<ViewModel, "actions"> => {
        const handleMouseDown = (nodeId: string) => {
            setViewState(switchToSelection({ selectedIds: new Set([nodeId]), selectionWindow: selectionWindow.rect }));
        };

        return {
            nodes: nodesModel.nodes.map(node => node.clone().setHandler("onMouseDown", () => handleMouseDown(node.id))),
            overlay: {
                onMouseDown: selectionWindow.onOverlayMouseDown
            },
            window: {
                onMouseMove: e => selectionWindow.onWindowMouseMove(viewState, e),
                onMouseUp: selectionWindow.reset
            }
        };
    };
}
