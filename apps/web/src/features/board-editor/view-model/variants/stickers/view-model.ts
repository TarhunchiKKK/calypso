import type React from "react";
import { NodesFactory } from "@/features/board-editor/nodes";
import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { StickersNodesMapper } from "./nodes-mapping.lib";

export function useStickersViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (): OmitFields<ViewModel, "actions"> => {
        canvasMediator.setHandlers({
            left: {
                onClick: (e: React.MouseEvent) => {
                    const clickPoint = layoutDimensionsModel.applyForPoint({ x: e.clientX, y: e.clientY });

                    nodesModel.service.createOne(NodesFactory.sticker(clickPoint).data);
                }
            }
        });

        return {
            nodes: new StickersNodesMapper(nodesModel.nodes).get(),
            canvas: canvasMediator.handlers
        };
    };
}
