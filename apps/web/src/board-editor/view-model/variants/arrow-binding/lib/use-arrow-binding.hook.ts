import type { ViewModelParams } from "@/board-editor/view-model/types";
import { Geometry } from "@/shared/lib/geometry";
import { switchToSelection } from "../../selection/switcher";
import type { ArrowBindingViewState } from "../view-state";
import { findArrow } from "./find-arrow.helper";

export function useArrowBinding({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const onMouseMove = (viewState: ArrowBindingViewState, e: MouseEvent) => {
        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        const arrow = findArrow(nodesModel, viewState.arrowId);

        const newNode = {
            ...arrow,
            [viewState.side]: currentPoint
        };

        nodesModel.service.updateOne(newNode);
    };

    const onMouseUp = (viewState: ArrowBindingViewState, e: MouseEvent) => {
        const point = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        const arrow = findArrow(nodesModel, viewState.arrowId);

        const newNode = {
            ...arrow,
            [viewState.side]: point
        };

        nodesModel.service.updateOne(newNode);

        setViewState(switchToSelection({ selectedIds: new Set(arrow.id) }));
    };

    return { onMouseMove, onMouseUp };
}
