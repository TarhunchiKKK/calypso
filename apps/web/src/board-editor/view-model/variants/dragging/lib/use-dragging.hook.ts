import type { Offset } from "@lib/common";
import { useState } from "react";
import { Geometry } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../../types";
import { switchToSelection } from "../../selection/switcher";
import type { DraggingViewState } from "../view-state";
import { DraggingNodesMapper } from "./nodes-mapper";

export function useDragging({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [offset, setOffset] = useState<Offset>();

    const onWindowMouseMove = (viewState: DraggingViewState, e: MouseEvent) => {
        const point = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        setOffset(Geometry.calculateOffset(viewState.startPoint, point));
    };

    const onWindowMouseUp = (viewState: DraggingViewState) => {
        if (!offset) {
            return;
        }

        const shiftedNodes = DraggingNodesMapper.create()
            .setNodes(nodesModel.nodes)
            .setSelectedIds(viewState.nodeIds)
            .setOffset(offset)
            .getNodesWithOffset()
            .filter((node) => viewState.nodeIds.has(node.id));

        nodesModel.service.updateMany(shiftedNodes);

        setViewState(
            switchToSelection({
                nodeIds: viewState.nodeIds
            })
        );

        setOffset(undefined);
    };

    return { offset, onWindowMouseMove, onWindowMouseUp };
}
