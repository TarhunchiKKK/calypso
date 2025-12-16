import { OmitFields } from "@/shared/lib/typescript";
import { selectNodes } from "../../../domain/selection";
import { useSelectionWindow } from "../../hooks/use-selection-window";
import { ViewModel, ViewModelParams } from "../../types";
import { useDragging } from "../../hooks/use-dragging";
import { useResizing } from "../../hooks/use-resizing";
import { ResizeDirection, withNodeId } from "../../../domain/dom";
import { SelectionViewState } from "./view-state";
import { switchToIdle } from "../idle/switcher";
import { switchToEditing } from "../editing/switcher";
import { useMouseEventsMediators } from "../../hooks/use-mouse-events-mediators";
import { SelectionNodesMapper } from "./helpers";

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
            onMouseDown: e => dragging.onMouseDown(viewState, e),
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
                .clone()
                .applySelection(selectionWindow.selectedNodesIds, handleResize)
                .applyHandlers(handlers)
                .get(),
            overlay: mediators.overlay.createHandlers({
                onMouseDown: selectionWindow.onOverlayMouseDown,
                onClick: () => {
                    handleSkipNextClick();
                    setViewState(switchToIdle());
                }
            }),
            window: {
                onMouseMove: e => {
                    selectionWindow.onWindowMouseMove(viewState, e);
                },
                onMouseUp: () => {
                    selectionWindow.reset();
                }
            }
        };
    };
}
