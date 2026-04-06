import { NodesFactory } from "@/board-editor/nodes";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { switchToEditing } from "../editing/switcher";
import { TextCreationNodesMapper } from "./lib/nodes-mapper";

export function useTextCreationViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (): DecoratableViewModel => {
        canvasMediator.setHandlers({
            left: {
                onClick: e => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    const textNode = NodesFactory.text({
                        point: clickPoint
                    });

                    nodesModel.service.createOne(textNode);

                    switchToEditing({ selectedNodeId: textNode.id });
                }
            }
        });

        return {
            nodes: TextCreationNodesMapper.from(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers
        };
    };
}
