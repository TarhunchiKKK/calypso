import { OmitFields } from "@/shared/lib/typescript.lib";
import { Geometry } from "../../../lib/geometry";
import { NodesFactory } from "../../../nodes/compose/nodes.factory";
import { ViewModel, ViewModelParams } from "../../types";
import React from "react";

export function useStickersViewModel(params: ViewModelParams) {
    const { nodesModel, canvasRect } = params;

    return (): OmitFields<ViewModel, "actions"> => {
        const handleCanvasClick = (e: React.MouseEvent) => {
            const clickPoint = Geometry.recalculatePosition(
                {
                    x: e.clientX,
                    y: e.clientY
                },
                canvasRect
            );

            nodesModel.add(NodesFactory.sticker(clickPoint));
        };

        return {
            nodes: nodesModel.nodes.map(node => node.clone()),
            canvas: {
                onClick: handleCanvasClick
            }
        };
    };
}
