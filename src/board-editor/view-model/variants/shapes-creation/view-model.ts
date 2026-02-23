import type React from "react";
import { NodesFactory } from "@/board-editor/nodes";
import { Geometry } from "@/shared/lib/geometry";
import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { ShapesCreationNodesMapper } from "./nodes-mapping.lib";
import type { ShapesCreationViewState } from "./view-state";

export function useShapesCreationViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (viewState: ShapesCreationViewState): OmitFields<ViewModel, "actions"> => {
        canvasMediator.setHandlers({
            left: {
                onClick: (e: React.MouseEvent) => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    nodesModel.service.createOne(NodesFactory.shape(clickPoint, viewState.variant).data);
                }
            }
        });

        return {
            nodes: ShapesCreationNodesMapper.from(nodesModel.nodes).get(),
            canvas: canvasMediator.handlers
        };
    };
}
