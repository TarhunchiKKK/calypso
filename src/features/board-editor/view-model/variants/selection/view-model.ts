import { OmitFields } from "@/shared/lib/typescript.lib";
import { useSelectionWindow } from "../../hooks/use-selection-window.hook";
import { ViewModel, ViewModelParams } from "../../types";
import { useDragging } from "../../hooks/use-dragging.hook";
import { useResizing } from "../../hooks/use-resizing.hook";
import { SelectionViewState } from "./view-state";
import { switchToIdle } from "../idle/switcher";
import { switchToEditing } from "../editing/switcher";
import { useMouseEventsMediators } from "../../hooks/use-mouse-events-mediators.hook";
import { SelectionNodesMapper } from "./nodes-mapper.lib";
import { ResizeDirection } from "@/features/board-editor/modules/resizing";
import { selectNodes } from "@/features/board-editor/modules/selection";
import { withNodeId } from "@/features/board-editor/core";

export function useSelectionViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSelectionWindow(params);

    const dragging = useDragging(params);

    const resizing = useResizing(params);

    const mediators = useMouseEventsMediators();

    return (viewState: SelectionViewState): OmitFields<ViewModel, "actions"> => {
        // ? should this handler exists
        const handleSkipNextClick = () => {
            if (viewState.skipNextClick) {
                setViewState({ ...viewState, skipNextClick: undefined });
                return;
            }
        };

        const handlers = mediators.node.createHandlers({
            onMouseDown: e => dragging.onMouseDown(viewState.selectedIds, e),
            onClick: withNodeId((nodeId, e) => {
                handleSkipNextClick();

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
            nodes: SelectionNodesMapper.from(nodesModel.nodes, viewState)
                .wrap()
                .applySelection(selectionWindow.selectedNodesIds, handleResize)
                .applyHandlers(handlers)
                .get(),
            overlay: mediators.overlay.createHandlers({
                onMouseDown: e => selectionWindow.onOverlayMouseDown(viewState, e),
                onClick: () => {
                    handleSkipNextClick();
                    setViewState(switchToIdle());
                }
            })
        };
    };
}
