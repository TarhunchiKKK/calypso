import { NodesFactory } from "@/board-editor/nodes";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { StickersCreationNodesMapper } from "./lib/nodes-mapper";

export function useStickersCreationViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (): DecoratableViewModel => {
        canvasMediator.setHandlers({
            left: {
                onClick: e => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    nodesModel.service.createOne(
                        NodesFactory.sticker({
                            point: clickPoint
                        })
                    );
                }
            }
        });

        return {
            nodes: new StickersCreationNodesMapper(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers
        };
    };
}
