import type { Id, RelativePoint } from "@repo/common";
import { useState } from "react";
import type { ViewModelParams } from "@/board-editor/view-model/types";
import { switchToSelection } from "../../selection/switcher";
import type { ArrowBindingViewState } from "../view-state";
import { findArrow } from "./find-arrow.helper";

export function useBindingNode({ nodesModel, setViewState }: ViewModelParams) {
    const [nodeId, setNodeId] = useState<Id>();

    const onMouseEnter = (nodeId: Id) => {
        setNodeId(nodeId);
    };

    const onMouseLeave = () => {
        setNodeId(undefined);
    };

    const onMouseUp = (viewState: ArrowBindingViewState, point: RelativePoint) => {
        console.log(point);

        const arrow = findArrow(nodesModel, viewState.arrowId);

        const newNode = {
            ...arrow,
            [viewState.side]: point
        };

        nodesModel.service.updateOne(newNode);

        setViewState(switchToSelection({ selectedIds: new Set(arrow.id) }));
    };

    return {
        nodeId,
        onMouseEnter,
        onMouseLeave,
        onMouseUp
    };
}
