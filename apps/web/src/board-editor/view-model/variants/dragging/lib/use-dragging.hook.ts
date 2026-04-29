import type { Offset } from "@repo/common";
import { useState } from "react";
import { Geometry } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../../types";
import { switchToSelection } from "../../selection/switcher";
import type { DraggingViewState } from "../view-state";
import { DraggingNodesMapper } from "./nodes-mapper";

export function useDragging({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [offset, setOffset] = useState<Offset>();

    const onWindowMouseMove = (viewState: DraggingViewState, e: MouseEvent) => {
        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        setOffset(Geometry.calculateOffset(viewState.startPoint, currentPoint));
    };

    const onWindowMouseUp = (viewState: DraggingViewState) => {
        if (!offset) {
            return;
        }

        const shiftedNodes = DraggingNodesMapper.getNodesWithOffset(nodesModel.nodes, viewState.selectedIds, offset);

        nodesModel.service.replaceAll(shiftedNodes);

        setViewState(
            switchToSelection({
                selectedIds: viewState.selectedIds,
                skipNextClick: true
            })
        );

        setOffset(undefined);
    };

    return { offset, onWindowMouseMove, onWindowMouseUp };
}
