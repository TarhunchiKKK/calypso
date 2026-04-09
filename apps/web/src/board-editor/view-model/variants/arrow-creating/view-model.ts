import { NodesFactory } from "@/board-editor/nodes";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { switchToArrowBinding } from "../arrow-binding/switcher";
import { ArrowCreationNodesMapper } from "./lib/nodes.mapper";

export function useArrowCreationViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel, setViewState } = params;

    const canvasMediator = useMouseEventsMediator();

    return (): DecoratableViewModel => {
        canvasMediator.setHandlers({
            left: {
                onClick: e => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    const arrow = NodesFactory.arrow({ start: clickPoint, end: clickPoint });

                    nodesModel.service.createOne(arrow);

                    setViewState(
                        switchToArrowBinding({
                            nodeId: arrow.id,
                            direction: "n"
                        })
                    );
                }
            }
        });

        return {
            nodes: new ArrowCreationNodesMapper(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers
        };
    };
}
