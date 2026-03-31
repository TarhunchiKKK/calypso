import type { OmitFields } from "@repo/common";
import { NodesFactory } from "@/board-editor/nodes";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToArrowCreatingStart } from "../arrow-creating-start/switcher";
import { ArrowCreatingEndNodesMapper } from "./lib/nodes.mapper";
import type { ArrowCreatingEndViewState } from "./view-state";

export function useArrowCreatingEndViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (viewState: ArrowCreatingEndViewState): OmitFields<ViewModel, "actions"> => {
        canvasMediator.setHandlers({
            left: {
                onClick: e => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    nodesModel.service.createOne(
                        NodesFactory.arrow({
                            start: viewState.startPoint,
                            end: clickPoint
                        })
                    );

                    switchToArrowCreatingStart();
                }
            }
        });

        return {
            nodes: ArrowCreatingEndNodesMapper.from(nodesModel.nodes).map(),
            canvas: canvasMediator.handlers
        };
    };
}
