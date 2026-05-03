import type { DecoratableViewModel } from "../../decorators";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { StylingNodesMapper } from "./lib/nodes-mapper";
import { useStylesPanel } from "./lib/use-styles-panel.hook";
import type { StylingViewState } from "./view-state";

export function useStylingViewModel({ nodesModel }: ViewModelParams) {
    const renderStylesPanel = useStylesPanel(nodesModel);

    const canvasMediator = useMouseEventsMediator();

    return (viewState: StylingViewState): DecoratableViewModel => {
        canvasMediator.setHandlers({
            left: {
                onClick: () => switchToSelection({ selectedIds: viewState.selectedIds })
            }
        });

        return {
            nodes: StylingNodesMapper.create().setNodes(nodesModel.nodes).setSelectedIds(viewState.selectedIds).map(),
            canvas: canvasMediator.handlers,
            additionalElements: {
                layout: renderStylesPanel(viewState)
            }
        };
    };
}
