import type { OmitFields } from "@repo/common";
import { StylesBar } from "@/features/board-editor/modules/styling";
import { NodeStylesFactory } from "@/features/board-editor/nodes";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { StylingNodesMapper } from "./nodes-mapping.lib";
import type { StylingViewState } from "./view-state";

export function useStylingViewModel(params: ViewModelParams) {
    const { nodesModel } = params;

    const canvasMediator = useMouseEventsMediator();

    return (viewState: StylingViewState): OmitFields<ViewModel, "actions"> => {
        canvasMediator.left.setHandlers({
            onClick: () => switchToSelection({ selectedIds: viewState.selectedIds })
        });

        const sharedStyles = NodeStylesFactory.getSharedStyles(nodesModel.nodes.filter(node => viewState.selectedIds.has(node.id)));

        return {
            nodes: StylingNodesMapper.from(nodesModel.nodes).get(),
            canvas: canvasMediator.handlers,
            additionalElement: (
                <div style={{ left: viewState.barPosition.x, top: viewState.barPosition.y }} className="absolute -translate-x-1/2 -translate-y-1/2">
                    <StylesBar {...sharedStyles} />
                </div>
            )
        };
    };
}
