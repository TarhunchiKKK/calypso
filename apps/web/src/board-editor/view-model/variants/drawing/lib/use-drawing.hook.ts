import type { DrawingNode } from "@repo/boards";
import type { Point, Rect } from "@repo/common";
import { useState } from "react";
import type { ViewModelParams } from "@/board-editor/view-model/types";
import { NodesFactory } from "@/entities/nodes";
import { Geometry } from "@/shared/lib/geometry";

function getDrawingRect(points: Point[]): Rect {
    if (!points.length) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }

    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);

    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    return {
        x: minX - 5,
        y: minY - 5,
        width: maxX - minX + 10,
        height: maxY - minY + 10
    };
}

const minPointsDistance = 2;

export function useDrawing({ nodesModel, layoutDimensionsModel }: ViewModelParams) {
    const [node, setNode] = useState<DrawingNode>();

    const onMouseDown = (e: React.MouseEvent) => {
        const point = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

        const createdNode = NodesFactory.drawing({ point: point });

        setNode(createdNode);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!node) {
            throw new Error("Drawing node is not defined");
        }

        if (node.points.length === 0) {
            throw new Error("No points in arrow node");
        }

        const point = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));
        const lastPoint = node.points[node.points.length - 1];

        if (Geometry.pointsDistance(point, lastPoint) > minPointsDistance) {
            setNode({
                ...node,
                points: [...node.points, point]
            });
        }
    };

    const onMouseUp = () => {
        if (!node) {
            throw new Error("Drawing node is not defined");
        }

        const nodeToCreate = {
            ...node,
            rect: getDrawingRect(node.points)
        };

        nodesModel.service.createOne(nodeToCreate);

        setNode(undefined);
    };

    return {
        node,
        onMouseDown,
        onMouseMove,
        onMouseUp
    };
}
