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
            nodes: nodesModel.nodes.map(node => node.clone().setOnMouseDown(() => handleMouseDown(node.id))),
            layout: {},
            overlay: {
                onMouseDown: selectionWindow.onMouseDown
            },
            window: {
                onMouseMove: e => selectionWindow.onMouseMove(viewState, e),
                onMouseUp: () => selectionWindow.onMouseUp(viewState)
            }
        };
    };
}
