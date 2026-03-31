import type { OmitFields } from "@repo/common";
import type { ViewModel, ViewModelParams } from "../../types";
import { ArrowCreatingEndNodesMapper } from "./lib/nodes.mapper";
import { useArrowDrawing } from "./lib/use-arrow-drawing.hook";
import type { ArrowCreatingEndViewState } from "./view-state";

export function useArrowCreatingEndViewModel(params: ViewModelParams) {
    const arrowDrawing = useArrowDrawing(params);

    return (viewState: ArrowCreatingEndViewState): OmitFields<ViewModel, "actions"> => {
        return {
            nodes: ArrowCreatingEndNodesMapper.from(params.nodesModel.nodes).map(),
            window: {
                onMouseMove: arrowDrawing.onWindowMouseMove,
                onMouseUp: () => arrowDrawing.onWindowMouseUp(viewState)
            },
            additionalElements: {
                canvas: arrowDrawing.renderArrow(viewState)
            }
        };
    };
}
