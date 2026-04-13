import { DefaultNodesMapper } from "@/board-editor/lib/default-nodes-mapper.class";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import type { NodeCreationViewState } from "./view-state";

export function useNodeCreationViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (viewState: NodeCreationViewState): DecoratableViewModel => {
        canvasMediator.setHandlers({
            left: {
                onClick: e => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    const node = viewState.createNode(clickPoint, viewState);

                    nodesModel.service.createOne(node);

                    viewState.afterCreate?.(node, params);
                }
            }
        });

        return {
            nodes: DefaultNodesMapper.from(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers
        };
    };
}
