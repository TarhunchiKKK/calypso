import { NodesFactory } from "@/board-editor/nodes";
import { Geometry } from "@/shared/lib/geometry";
import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { ShapesCreationNodesMapper } from "./lib/nodes-mapper";
import type { ShapesCreationViewState } from "./view-state";

export function useShapesCreationViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (viewState: ShapesCreationViewState): OmitFields<ViewModel, "actions"> => {
        canvasMediator.setHandlers({
            left: {
                onClick: e => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    nodesModel.service.createOne(
                        NodesFactory.shape({
                            point: clickPoint,
                            variant: viewState.variant
                        })
                    );
                }
            }
        });

        return {
            nodes: ShapesCreationNodesMapper.from(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers
        };
    };
}
