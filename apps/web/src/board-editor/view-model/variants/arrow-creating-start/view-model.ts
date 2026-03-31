import type { OmitFields } from "@repo/common";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { ArrowCreatingStartNodesMapper } from "./lib/nodes.mapper";

export function useArrowCreatingStartViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (): OmitFields<ViewModel, "actions"> => {
        canvasMediator.setHandlers({
            left: {
                onClick: e => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));
                }
            }
        });

        return {
            nodes: new ArrowCreatingStartNodesMapper(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers
        };
    };
}
