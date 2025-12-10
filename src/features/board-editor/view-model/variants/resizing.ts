import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../types";
import { useResizing } from "../hooks/use-resizing";

export type ResizingViewState = {
    type: "resizing";

    nodeId: string;
};

export function switchToResizing(nodeId: string): ResizingViewState {
    return {
        type: "resizing",
        nodeId: nodeId
    };
}
export function useResizingViewModel(params: ViewModelParams) {
    const { getOnResizingEnd } = useResizing(params);

    return (viewState: ResizingViewState): OmitFields<ViewModel, "actions"> => {
        const { nodesModel } = params;

        const onResizeEnd = getOnResizingEnd(viewState);

        return {
            nodes: nodesModel.nodes.map(node => node.setHandler("onResizeEnd", onResizeEnd)),
            layout: {}
        };
    };
}
