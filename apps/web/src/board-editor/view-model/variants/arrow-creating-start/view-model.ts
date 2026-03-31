import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { switchToArrowCreatingEnd } from "../arrow-creating-end/switcher";
import { ArrowCreatingStartNodesMapper } from "./lib/nodes.mapper";

export function useArrowCreatingStartViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel, setViewState } = params;

    const canvasMediator = useMouseEventsMediator();

    return (): DecoratableViewModel => {
        canvasMediator.setHandlers({
            left: {
                onClick: e => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    setViewState(switchToArrowCreatingEnd(clickPoint));
                }
            }
        });

        return {
            nodes: new ArrowCreatingStartNodesMapper(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers
        };
    };
}
