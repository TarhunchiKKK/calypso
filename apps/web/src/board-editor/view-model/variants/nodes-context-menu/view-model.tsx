import { Geometry } from "@/shared/lib/geometry";
import type { DecoratableViewModel } from "../../decorators";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { switchToStyling } from "../styling/switcher";
import { NodesContextMenu } from "./lib/nodes-context-menu.component";
import { NodesContextMenuNodesMapper } from "./lib/nodes-mapper";
import { useContextMenuOptions } from "./lib/use-context-menu-options.hook";
import type { NodesContextMenuViewState } from "./view-state";

export function useNodesContextMenuViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel, setViewState } = params;

    const contextMenuOptions = useContextMenuOptions(params);

    const overlayMediator = useMouseEventsMediator();

    return (viewState: NodesContextMenuViewState): DecoratableViewModel => {
        overlayMediator.setHandlers({
            left: {
                onClick: () => setViewState(switchToSelection({ selectedIds: viewState.selectedIds }))
            },
            right: {
                onClick: e => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    setViewState(switchToStyling({ selectedIds: viewState.selectedIds, position: clickPoint }));
                }
            }
        });

        return {
            nodes: NodesContextMenuNodesMapper.create().setNodes(nodesModel.nodes).setSelectedIds(viewState.selectedIds).map(),
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
}
