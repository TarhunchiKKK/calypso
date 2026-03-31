import type { Point } from "@repo/common";
import { useState } from "react";
import { NodeDecoratorsFactory, NodesFactory } from "@/board-editor/nodes";
import type { ArrowNodeWrapper } from "@/board-editor/nodes/variants/arrow/arrow-node.wrapper";
import type { ViewModelParams } from "@/board-editor/view-model/types";
import { Geometry } from "@/shared/lib/geometry";
import { switchToArrowCreatingStart } from "../../arrow-creating-start/switcher";
import type { ArrowCreatingEndViewState } from "../view-state";

export function useArrowDrawing({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [currentPoint, setCurrentPoint] = useState<Point | null>(null);

    const onWindowMouseMove = (e: MouseEvent) => {
        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        setCurrentPoint(currentPoint);
    };

    const onWindowMouseUp = (viewState: ArrowCreatingEndViewState) => {
        if (!currentPoint) {
            return;
        }

        const arrow = NodesFactory.arrow({ start: viewState.startPoint, end: currentPoint });

        nodesModel.service.createOne(arrow);

        setCurrentPoint(null);

        setViewState(switchToArrowCreatingStart());
    };

    const renderArrow = (viewState: ArrowCreatingEndViewState) => {
        if (!currentPoint) {
            return null;
        }

        const arrow = NodesFactory.arrow({ start: viewState.startPoint, end: currentPoint });

        const wrapper = NodeDecoratorsFactory.wrap(arrow) as ArrowNodeWrapper;

        wrapper.setAbsolutePosition({ start: viewState.startPoint, end: currentPoint });

        return wrapper.render();
    };

    return { onWindowMouseMove, onWindowMouseUp, renderArrow };
}
