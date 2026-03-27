import { useState } from "react";
import { applyResizing } from "@/board-editor/modules/resizing";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import { Geometry, } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../../types";
import { switchToSelection } from "../../selection/switcher";
import type { ResizingViewState } from "../view-state";
import type { Id, Rect } from "@repo/common";

export function useResizing({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [newSize, setNewSize] = useState<Rect>();

    const getResizingNode = (nodeId: Id) => {
        const node = nodesModel.nodes.find(node => node.id === nodeId);

        if (!node) {
            throw Error("Node to resize not found");
        }

        return node;
    };

    const onMouseMove = (viewState: ResizingViewState, e: MouseEvent) => {
        const node = getResizingNode(viewState.nodeId);

        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        setNewSize(applyResizing(NodeDecoratorsFactory.wrap(node).rect, currentPoint, viewState.direction));
    };

    const onMouseUp = (viewState: ResizingViewState) => {
        const node = getResizingNode(viewState.nodeId);

        if (newSize) {
            nodesModel.service.updateOne(
                NodeDecoratorsFactory.resizable(NodeDecoratorsFactory.wrap(node), newSize).data
            );
        }

        setViewState(switchToSelection({ selectedIds: new Set(viewState.nodeId), skipNextClick: true }));

        setNewSize(undefined);
    };

    return {
        newSize,
        onMouseMove,
        onMouseUp
    };
}
