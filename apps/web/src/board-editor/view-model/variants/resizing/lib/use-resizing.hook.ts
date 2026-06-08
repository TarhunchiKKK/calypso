import type { Id, Rect } from "@lib/common";
import { useState } from "react";
import { applyResizing } from "@/board-editor/modules/resizing";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import { NodeRectsFactory } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../../types";
import { switchToSelection } from "../../selection/switcher";
import type { ResizingViewState } from "../view-state";

export function useResizing({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [newSize, setNewSize] = useState<Rect>();

    const getResizingNode = (nodeId: Id) => {
        const node = nodesModel.service.findOne(nodeId);

        if (!node) {
            throw Error("Node to resize not found");
        }

        return node;
    };

    const onMouseMove = (viewState: ResizingViewState, e: MouseEvent) => {
        const node = getResizingNode(viewState.nodeId);

        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        setNewSize(applyResizing(NodeRectsFactory.rect(node), currentPoint, viewState.direction));
    };

    const onMouseUp = (viewState: ResizingViewState) => {
        const node = getResizingNode(viewState.nodeId);

        if (newSize) {
            nodesModel.service.updateOne(NodeDecoratorsFactory.resizing(NodeWrappersFactory.wrap(node), newSize).data);
        }

        setViewState(switchToSelection({ nodeIds: new Set([viewState.nodeId]) }));

        setNewSize(undefined);
    };

    return {
        newSize,
        onMouseMove,
        onMouseUp
    };
}
