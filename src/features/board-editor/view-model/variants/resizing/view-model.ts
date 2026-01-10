import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../../types";
import { useResizing } from "../../hooks/use-resizing.hook";
import { ResizingViewState } from "./view-state";
import { ResizingNodesMapper } from "./nodes-mapping.lib";

export function useResizingViewModel(params: ViewModelParams) {
    const resizing = useResizing(params);

    return (viewState: ResizingViewState): OmitFields<ViewModel, "actions"> => {
        const { nodesModel } = params;

        return {
            nodes: ResizingNodesMapper.from(nodesModel.nodes).map(viewState, resizing.newSize).get(),
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
