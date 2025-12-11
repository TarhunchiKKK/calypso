import { OmitFields } from "@/shared/lib/typescript";
import { selectNodes } from "../../domain/selection";
import { useSelectionWindow } from "../hooks/use-selection-window";
import { ViewModel, ViewModelParams } from "../types";
import { Rect } from "../../domain/geometry";
import { useDragging } from "../hooks/use-dragging";
import { useResizing } from "../hooks/use-resizing";
import { ResizeDirection } from "../../domain/dom";
import { switchToIdle } from "./idle";

export type SelectionViewState = {
    type: "selection";
    selectedIds: Set<string>;
    selectionWindow?: Rect;
    skipNextClick?: boolean;
};

export function switchToSelection({
    selectedIds,
    selectionWindow,
    skipNextClick
}: Partial<SelectionViewState> = {}): SelectionViewState {
    return {
        type: "selection",
        selectedIds: selectedIds ?? new Set(),
        selectionWindow: selectionWindow,
        skipNextClick: skipNextClick
    };
}

export function useSelectionViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSelectionWindow(params);

    const dragging = useDragging(params);

    const resizing = useResizing(params);

    return (viewState: SelectionViewState): OmitFields<ViewModel, "actions"> => {
        const handleSkipNextClick = () => {
            if (viewState.skipNextClick) {
                setViewState({ ...viewState, skipNextClick: undefined });
                return;
            }
        };

        const handleSelectNode = (nodeId: string, e: React.MouseEvent<HTMLDivElement>) => {
            handleSkipNextClick();

            const selectionMode = e.shiftKey || e.ctrlKey ? "toggle" : "replace";

            setViewState({
                ...viewState,
                selectedIds: selectNodes([nodeId], selectionMode, viewState.selectedIds)
            });
        };

        const onlyOneNodeSelected = viewState.selectedIds.size === 1;

        return {
            nodes: nodesModel.nodes
                .map(node => node.clone())
                .map(node =>
                    viewState.selectedIds.has(node.id) || selectionWindow.selectedNodesIds.has(node.id)
                        ? node
                              .select(onlyOneNodeSelected)
                              .setHandler("onResizeStart", (nodeId: string, direction: ResizeDirection) => {
                                  dragging.reset();
                                  resizing.onMouseDown(nodeId, direction);
                              })
                        : node
                )
                .map(node =>
                    node
                        .setHandler("onClick", handleSelectNode.bind(null, node.id))
                        .setHandler("onMouseDown", e => dragging.onMouseDown(viewState, e))
                ),
            overlay: {
                onMouseDown: selectionWindow.onOverlayMouseDown,
                onClick: () => {
                    handleSkipNextClick();
                    setViewState(switchToIdle());
                }
            },
            window: {
                onMouseMove: e => {
                    selectionWindow.onWindowMouseMove(viewState, e);
                    dragging.onWindowMouseMove(viewState, e);
                },
                onMouseUp: () => {
                    selectionWindow.reset();
                    dragging.reset();
                }
            }
        };
    };
}
