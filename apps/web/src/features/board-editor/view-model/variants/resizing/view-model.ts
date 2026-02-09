import type { OmitFields } from "@/shared/lib/typescript";
import type { ViewModel, ViewModelParams } from "../../types";
import { ResizingNodesMapper } from "./nodes-mapping.lib";
import { useResizing } from "./use-resizing.hook";
import type { ResizingViewState } from "./view-state";

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
