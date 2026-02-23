import type React from "react";
import { NodesFactory } from "@/board-editor/nodes";
import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { ShapesNodesMapper } from "./nodes-mapping.lib";
import type { ShapesViewState } from "./view-state";

// REFACTOR: rename into `ShapesCreatingViewModel`

export function useShapesViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (viewState: ShapesViewState): OmitFields<ViewModel, "actions"> => {
        canvasMediator.setHandlers({
            left: {
                onClick: (e: React.MouseEvent) => {
                    const clickPoint = layoutDimensionsModel.applyForPoint({ x: e.clientX, y: e.clientY });

                    nodesModel.service.createOne(NodesFactory.shape(clickPoint, viewState.variant).data);
                }
            }
        });

        return {
            nodes: ShapesNodesMapper.from(nodesModel.nodes).get(),
            canvas: canvasMediator.handlers
        };
    };
}
