import { Geometry } from "@/shared/lib/geometry";
import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToSelection } from "../selection/switcher";
import { switchToStyling } from "../styling/switcher";
import { NodesContextMenu } from "./lib/nodes-context-menu.component";
import { NodesContextMenuNodesMapper } from "./lib/nodes-mapping.lib";
import { useContextMenuOptions } from "./lib/use-context-menu-options.hook";
import type { NodesContextMenuViewState } from "./view-state";

export function useNodesContextMenuViewModel(params: ViewModelParams) {
    const { nodesModel, layoutDimensionsModel, setViewState } = params;

    const contextMenuOptions = useContextMenuOptions(params);

    const overlayMediator = useMouseEventsMediator();

    return (viewState: NodesContextMenuViewState): OmitFields<ViewModel, "actions"> => {
        overlayMediator.setHandlers({
            left: {
                onClick: () => setViewState(switchToSelection({ selectedIds: viewState.selectedIds }))
            },
            right: {
                onClick: (e: React.MouseEvent) => {
                    const clickPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

                    setViewState(switchToStyling({ selectedIds: viewState.selectedIds, barPosition: clickPoint }));
                }
            }
        });

        return {
            nodes: NodesContextMenuNodesMapper.from(nodesModel.nodes).get(),
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
