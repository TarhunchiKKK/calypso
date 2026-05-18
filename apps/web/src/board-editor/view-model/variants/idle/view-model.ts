import { DefaultNodesMapper, withNodeId } from "@/board-editor/core";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelHook } from "../../types";
import { useSwitchToDragging } from "../dragging/switcher";
import { switchToEditing } from "../editing/switcher";
import { switchToNodesContextMenu } from "../nodes-context-menu/switcher";
import { switchToSelection } from "../selection/switcher";
import { useSwitchToSelectionWindow } from "../selection-window/switcher";
import { switchToStyling } from "../styling/switcher";
import type { IdleViewState } from "./view-state";

export const useIdleViewModel: ViewModelHook<IdleViewState> = params => {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSwitchToSelectionWindow(params);

    const dragging = useSwitchToDragging(params);

    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();

    return viewState => {
        nodesMediator.setHandlers({
            left: {
                onMouseDown: withNodeId((nodeId, e) => {
                    dragging.onMouseDown(new Set([nodeId]), e);
                }),
                onClick: withNodeId(nodeId => {
                    setViewState(switchToSelection({ selectedIds: new Set([nodeId]) }));
                }),
                onDoubleClick: withNodeId(nodeId => {
                    setViewState(switchToEditing({ selectedNodeId: nodeId }));
                })
            },
            right: {
                onClick: withNodeId((id, e) => {
                    setViewState(
                        switchToNodesContextMenu({
                            selectedIds: new Set([id]),
                            position: Geometry.pointFromEvent(e)
                        })
                    );
                })
            }
        });

        overlayMediator.setHandlers({
            left: {
                onMouseDown: e => selectionWindow.onOverlayMouseDown(viewState, e)
            },
            right: {
                onClick: withNodeId((id, e) => {
                    setViewState(
                        switchToStyling({
                            selectedIds: new Set([id]),
                            position: Geometry.pointFromEvent(e)
                        })
                    );
                })
            }
        });

        return {
            nodes: DefaultNodesMapper.create().setNodes(nodesModel.nodes).setHandlers(nodesMediator.handlers).map(),
            overlay: overlayMediator.handlers
        };
    };
};
