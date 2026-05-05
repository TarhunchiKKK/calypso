import { DefaultNodesMapper } from "@/board-editor/core";
import { Geometry } from "@/shared/lib/geometry";
import type { DecoratableViewModel } from "../../decorators";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { NodeCreationViewState } from "./view-state";

// DOCS: How creation works
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
            nodes: DefaultNodesMapper.create().setNodes(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers
        };
    };
}
