import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../types";
import { useResizing } from "../hooks/use-resizing";
import { ResizeDirection } from "../../domain/dom";

export type ResizingViewState = {
    type: "resizing";

    nodeId: string;

    direction: ResizeDirection;
};

export function switchToResizing({ nodeId, direction }: OmitFields<ResizingViewState, "type">): ResizingViewState {
    return {
        type: "resizing",
        nodeId: nodeId,
        direction: direction
    };
}
export function useResizingViewModel(params: ViewModelParams) {
    const resizing = useResizing(params);

    return (viewState: ResizingViewState): OmitFields<ViewModel, "actions"> => {
        const { nodesModel } = params;

        return {
            nodes: nodesModel.nodes,
            layout: {},
            window: {
                onMouseMove: e => resizing.onMouseMove(viewState, e),
                onMouseUp: e => {
                    e.stopPropagation();
                    resizing.onMouseUp(viewState);
                }
            }
        };
    };
}
