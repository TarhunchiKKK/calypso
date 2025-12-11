import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../../types";
import { useResizing } from "../../hooks/use-resizing";
import { ResizingViewState } from "./view-state";

export function useResizingViewModel(params: ViewModelParams) {
    const resizing = useResizing(params);

    return (viewState: ResizingViewState): OmitFields<ViewModel, "actions"> => {
        const { nodesModel } = params;

        return {
            nodes: nodesModel.nodes,
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
