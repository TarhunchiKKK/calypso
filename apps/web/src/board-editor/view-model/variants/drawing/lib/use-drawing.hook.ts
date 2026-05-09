import type { DrawingNode } from "@repo/boards-common";
import { useState } from "react";
import type { ViewModelParams } from "@/board-editor/view-model/types";
import { NodesFactory } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";

export function useDrawing({ nodesModel, layoutDimensionsModel }: ViewModelParams) {
    const [node, setNode] = useState<DrawingNode>();

    const onMouseDown = (e: React.MouseEvent) => {
        const point = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        const createdNode = NodesFactory.drawing({ point: point });

        setNode(createdNode);
    };

    const onMouseMove = (e: MouseEvent) => {
        const point = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        setNode(prev => {
            if (!prev) {
                throw new Error("Drawing node is not defined");
            }

            return {
                ...prev,
                points: [...prev.points, point]
            };
        });
    };

    const onMouseUp = () => {
        if (!node) {
            throw new Error("Drawing node is not defined");
        }

        nodesModel.service.createOne(node);

        setNode(undefined);
    };

    return {
        node,
        onMouseDown,
        onMouseMove,
        onMouseUp
    };
}
