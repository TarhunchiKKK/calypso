import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelHook } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { switchToStyling } from "../styling/switcher";
import { NodesContextMenu } from "./lib/nodes-context-menu.component";
import { NodesContextMenuNodesMapper } from "./lib/nodes-mapper";
import { useContextMenuOptions } from "./lib/use-context-menu-options.hook";
import type { NodesContextMenuViewState } from "./view-state";

export const useNodesContextMenuViewModel: ViewModelHook<NodesContextMenuViewState> = (params) => {
    const { nodesModel, layoutDimensionsModel, setViewState } = params;

    const contextMenuOptions = useContextMenuOptions(params);

    const overlayMediator = useMouseEventsMediator();

    return (viewState) => {
        overlayMediator.setHandlers({
            left: {
                onClick: () => setViewState(switchToSelection({ nodeIds: viewState.nodeIds }))
            },
            right: {
                onClick: (e) => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    setViewState(switchToStyling({ nodeIds: viewState.nodeIds, position: clickPoint }));
                }
            }
        });

        return {
            nodes: NodesContextMenuNodesMapper.create().setNodes(nodesModel.nodes).setSelectedIds(viewState.nodeIds).map(),
            overlay: overlayMediator.handlers,
            additionalElements: {
                layout: (
                    <div style={{ position: "absolute", left: viewState.position.x, top: viewState.position.y }}>
                        <NodesContextMenu groups={contextMenuOptions.create(viewState)} />
                    </div>
                )
            }
        };
    };
};
