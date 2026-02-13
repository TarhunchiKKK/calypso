import { withNodeId } from "@/features/board-editor/core";
import type { ResizeDirection } from "@/features/board-editor/modules/resizing";
import { selectNodes } from "@/features/board-editor/modules/selection";
import type { OmitFields } from "@/shared/lib/typescript";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { useSwitchToDragging } from "../dragging/switcher";
import { switchToEditing } from "../editing/switcher";
import { switchToIdle } from "../idle/switcher";
import { useSwitchToResizing } from "../resizing/switcher";
import { useSwitchToSelectionWindow } from "../selection-window/switcher";
import { switchToStyling } from "../styling/switcher";
import { SelectionNodesMapper } from "./nodes-mapping.lib";
import type { SelectionViewState } from "./view-state";

export function useSelectionViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSwitchToSelectionWindow(params);

    const dragging = useSwitchToDragging(params);

    const resizing = useSwitchToResizing(params);

    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();
    const canvasMediator = useMouseEventsMediator();

    return (viewState: SelectionViewState): OmitFields<ViewModel, "actions"> => {
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
            }
        });

        overlayMediator.setHandlers({
            left: {
                onMouseDown: e => selectionWindow.onOverlayMouseDown(viewState, e),
                onClick: () => setViewState(switchToIdle())
            }
        });

        canvasMediator.setHandlers({
            right: {
                onClick: e => {
                    console.log("canvas click");
                    if (viewState.selectedIds.size) {
                        setViewState(
                            switchToStyling({
                                selectedIds: viewState.selectedIds,
                                barPosition: { x: e.clientX, y: e.clientY }
                            })
                        );
                    }
                }
            }
        });

        const handleResize = (nodeId: string, direction: ResizeDirection) => {
            resizing.onMouseDown(nodeId, direction);
        };

        return {
            nodes: SelectionNodesMapper.from(nodesModel.nodes)
                .setHandlers(nodesMediator.handlers)
                .setSelectedIds(viewState.selectedIds)
                .setResizeHandler(handleResize)
                .get(),
            canvas: canvasMediator.handlers,
            overlay: overlayMediator.handlers
        };
    };
}
