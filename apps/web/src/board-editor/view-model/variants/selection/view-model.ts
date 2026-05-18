import { withNodeId } from "@/board-editor/core";
import { selectNodes } from "@/board-editor/modules/selection";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelHook } from "../../types";
import { useSwitchToDragging } from "../dragging/switcher";
import { switchToEditing } from "../editing/switcher";
import { switchToIdle } from "../idle/switcher";
import { switchToNodesContextMenu } from "../nodes-context-menu/switcher";
import { useSwitchToSelectionWindow } from "../selection-window/switcher";
import { getResizeHandler } from "./lib/get-resize-handler.lib";
import { SelectionNodesMapper } from "./lib/nodes-mapper";
import type { SelectionViewState } from "./view-state";

export const useSelectionViewModel: ViewModelHook<SelectionViewState> = (params) => {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSwitchToSelectionWindow(params);

    const dragging = useSwitchToDragging(params);

    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();

    return (viewState) => {
        nodesMediator.setHandlers({
            left: {
                onMouseDown: (e) => dragging.onMouseDown(viewState.selectedIds, e),
                onClick: withNodeId((nodeId, e) => {
                    const selectionMode = e.shiftKey || e.ctrlKey ? "toggle" : "replace";

                    setViewState({
                        ...viewState,
                        selectedIds: selectNodes([nodeId], selectionMode, viewState.selectedIds)
                    });
                }),
                onDoubleClick: withNodeId((nodeId) => {
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
                onMouseDown: (e) => selectionWindow.onOverlayMouseDown(viewState, e),
                onClick: () => setViewState(switchToIdle())
            }
        });

        const handleResize = getResizeHandler(params);

        return {
            nodes: SelectionNodesMapper.create()
                .setNodes(nodesModel.nodes)
                .setHandlers(nodesMediator.handlers)
                .setSelectedIds(viewState.selectedIds)
                .setResizeHandler(handleResize)
                .map(),
            overlay: overlayMediator.handlers
        };
    };
};
