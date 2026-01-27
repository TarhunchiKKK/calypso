import { withNodeId } from "@/features/board-editor/core";
import type { OmitFields } from "@/shared/lib/typescript";
import { useDragging } from "../../hooks/use-dragging.hook";
import { useMouseEventsMediator } from "../../hooks/use-mouse-events-mediator.hook";
import { useSelectionWindow } from "../../hooks/use-selection-window.hook";
import type { ViewModel, ViewModelParams } from "../../types";
import { switchToEditing } from "../editing/switcher";
import { switchToSelection } from "../selection/switcher";
import { IdleNodesMapper } from "./nodes-mapping.lib";
import type { IdleViewState } from "./view-state";

export function useIdleViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSelectionWindow(params);

    const dragging = useDragging(params);

    const nodesMediator = useMouseEventsMediator();
    const overlayMediator = useMouseEventsMediator();

    return (viewState: IdleViewState): OmitFields<ViewModel, "actions"> => {
        nodesMediator.left.setHandlers({
            onMouseDown: withNodeId((nodeId, e) => {
                dragging.onMouseDown(new Set([nodeId]), e);
            }),
            onClick: withNodeId(nodeId => {
                setViewState(switchToSelection({ selectedIds: new Set([nodeId]) }));
            }),
            onDoubleClick: withNodeId(nodeId => {
                setViewState(switchToEditing({ selectedNodeId: nodeId }));
            })
        });

        overlayMediator.left.setHandlers({
            onMouseDown: e => selectionWindow.onOverlayMouseDown(viewState, e)
        });

        return {
            nodes: IdleNodesMapper.from(nodesModel.nodes).map(nodesMediator.handlers).get(),
            overlay: overlayMediator.handlers
        };
    };
}
