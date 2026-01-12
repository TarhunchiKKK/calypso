import { OmitFields } from "@/shared/lib/typescript";
import { ViewModel, ViewModelParams } from "../../types";
import React from "react";
import { Geometry } from "@/features/board-editor/core";
import { NodesFactory } from "@/features/board-editor/nodes";
import { StickersNodesMapper } from "./nodes-mapping.lib";

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
            nodes: new StickersNodesMapper(nodesModel.nodes).get(),
            canvas: {
                onClick: handleCanvasClick
            }
        };
    };
}
