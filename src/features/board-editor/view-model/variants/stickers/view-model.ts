import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../../types";
import React from "react";
import { Geometry, NodesMapper } from "@/features/board-editor/core";
import { NodesFactory } from "@/features/board-editor/nodes";

export function useStickersViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    return (): OmitFields<ViewModel, "actions"> => {
        const handleCanvasClick = (e: React.MouseEvent) => {
            const clickPoint = Geometry.applyLayoutDimensions(
                {
                    x: e.clientX,
                    y: e.clientY
                },
                layoutDimensionsModel
            );

            nodesModel.service.createOne(NodesFactory.sticker(clickPoint).data);
        };

        return {
            nodes: new NodesMapper(nodesModel.nodes).wrap().get(),
            canvas: {
                onClick: handleCanvasClick
            }
        };
    };
}
