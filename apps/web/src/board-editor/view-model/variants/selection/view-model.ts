import type { Id } from "@repo/common";
import { withNodeId } from "@/board-editor/core";
import type { ResizeDirection } from "@/board-editor/modules/resizing";
import { selectNodes } from "@/board-editor/modules/selection";
import { NodesFactory } from "@/board-editor/nodes";
import { Geometry } from "@/shared/lib/geometry";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModelParams } from "../../types";
import type { DecoratableViewModel } from "../../types/view-model.types";
import { switchToArrowBinding } from "../arrow-binding/switcher";
import { useSwitchToDragging } from "../dragging/switcher";
import { switchToEditing } from "../editing/switcher";
import { switchToIdle } from "../idle/switcher";
import { switchToNodesContextMenu } from "../nodes-context-menu/switcher";
import { switchToResizing } from "../resizing/switcher";
import { useSwitchToSelectionWindow } from "../selection-window/switcher";
import { SelectionNodesMapper } from "./lib/nodes-mapper";
import type { SelectionViewState } from "./view-state";

export function useSelectionViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSwitchToSelectionWindow(params);

    const dragging = useSwitchToDragging(params);

    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();

    return (viewState: SelectionViewState): DecoratableViewModel => {
        nodesMediator.setHandlers({
            left: {
                onMouseDown: e => dragging.onMouseDown(viewState.selectedIds, e),
                onClick: withNodeId((nodeId, e) => {
                    const selectionMode = e.shiftKey || e.ctrlKey ? "toggle" : "replace";

                    setViewState({
                        ...viewState,
                        selectedIds: selectNodes([nodeId], selectionMode, viewState.selectedIds)
                    });
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
                onMouseDown: e => selectionWindow.onOverlayMouseDown(viewState, e),
                onClick: () => setViewState(switchToIdle())
            }
        });

        const handleResize = (nodeId: Id, direction: ResizeDirection) => {
            const node = nodesModel.nodes.find(node => node.id === nodeId);

            if (!node) {
                throw new Error(`Node with id=${nodeId} not found`);
            }

            if (NodesFactory.is(node, "arrow")) {
                setViewState(switchToArrowBinding({ nodeId, direction }));
            } else {
                setViewState(switchToResizing({ nodeId, direction }));
            }
        };

        return {
            nodes: SelectionNodesMapper.from(nodesModel.nodes)
                .setHandlers(nodesMediator.handlers)
                .setSelectedIds(viewState.selectedIds)
                .setResizeHandler(handleResize)
                .map(),
            overlay: overlayMediator.handlers
        };
    };
}
