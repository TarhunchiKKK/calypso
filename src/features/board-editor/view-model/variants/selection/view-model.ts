import { withNodeId } from "@/features/board-editor/core";
import type { ResizeDirection } from "@/features/board-editor/modules/resizing";
import { selectNodes } from "@/features/board-editor/modules/selection";
import type { OmitFields } from "@/shared/lib/typescript";
import { useDragging } from "../../hooks/use-dragging.hook";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import { useResizing } from "../../hooks/use-resizing.hook";
import { useSelectionWindow } from "../../hooks/use-selection-window.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToEditing } from "../editing/switcher";
import { switchToIdle } from "../idle/switcher";
import { SelectionNodesMapper } from "./nodes-mapping.lib";
import type { SelectionViewState } from "./view-state";

export function useSelectionViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSelectionWindow(params);

    const dragging = useDragging(params);

    const resizing = useResizing(params);

    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();

    return (viewState: SelectionViewState): OmitFields<ViewModel, "actions"> => {
        const handlers = nodesMediator.createHandlers({
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
        });

        const handleResize = (nodeId: string, direction: ResizeDirection) => {
            resizing.onMouseDown(nodeId, direction);
        };

        return {
            nodes: SelectionNodesMapper.from(nodesModel.nodes).setHandlers(handlers).setSelectedIds(viewState.selectedIds).setResizeHandler(handleResize).get(),
            overlay: overlayMediator.createHandlers({
                onMouseDown: e => selectionWindow.onOverlayMouseDown(viewState, e),
                onClick: () => setViewState(switchToIdle())
            })
        };
    };
}
