import type { ArrowNode } from "@repo/boards";
import { useState } from "react";
import type { ViewModelParams } from "@/board-editor/view-model/types";
import { Geometry } from "@/shared/lib/geometry";
import { switchToSelection } from "../../selection/switcher";
import type { ArrowBindingViewState } from "../view-state";

// FIX: remove `onMouseUp`
export function useArrowBinding({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [arrow, setArrow] = useState<ArrowNode>();

    const onMouseMove = (viewState: ArrowBindingViewState, e: MouseEvent) => {
        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        const arrow = nodesModel.service.findOne<ArrowNode>(viewState.nodeId);

        const newArrow = {
            ...arrow,
            [viewState.side]: currentPoint
        };

        setArrow(newArrow);
    };

    const onMouseUp = () => {
        if (!arrow) {
            throw new Error("Arrow is not defined");
        }

        nodesModel.service.updateOne(arrow);

        setArrow(undefined);

        setViewState(switchToSelection({ nodeIds: new Set([arrow.id]) }));
    };

    return { arrow, onMouseMove, onMouseUp };
}
