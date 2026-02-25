import type React from "react";
import { NodesFactory } from "@/board-editor/nodes";
import { Geometry } from "@/shared/lib/geometry";
import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { StickersCreationNodesMapper } from "./nodes-mapping.lib";

export function useStickersCreationViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel, boardId } = params;

    const canvasMediator = useMouseEventsMediator();

    return (): OmitFields<ViewModel, "actions"> => {
        canvasMediator.setHandlers({
            left: {
                onClick: (e: React.MouseEvent) => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    nodesModel.service.createOne(
                        NodesFactory.sticker({
                            point: clickPoint,
                            boardId: boardId
                        })
                    );
                }
            }
        });

        return {
            nodes: new StickersCreationNodesMapper(nodesModel.nodes).get(),
            canvas: canvasMediator.handlers
        };
    };
}
