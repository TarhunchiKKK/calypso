import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelHook } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { StylingNodesMapper } from "./lib/nodes-mapper";
import { useStylesPanel } from "./lib/use-styles-panel.hook";
import type { StylingViewState } from "./view-state";

export const useStylingViewModel: ViewModelHook<StylingViewState> = ({ nodesModel }) => {
    const renderStylesPanel = useStylesPanel(nodesModel);

    const canvasMediator = useMouseEventsMediator();

    return (viewState) => {
        canvasMediator.setHandlers({
            left: {
                onClick: () => switchToSelection({ nodeIds: viewState.nodeIds })
            }
        });

        return {
            nodes: StylingNodesMapper.create().setNodes(nodesModel.nodes).setSelectedIds(viewState.nodeIds).map(),
            canvas: canvasMediator.handlers,
            additionalElements: {
                layout: renderStylesPanel(viewState)
            }
        };
    };
};
