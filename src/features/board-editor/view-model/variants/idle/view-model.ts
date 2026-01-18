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

    const mediator = useMouseEventsMediator();

    return (viewState: IdleViewState): OmitFields<ViewModel, "actions"> => {
        const handlers = mediator.createHandlers({
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

        return {
            nodes: IdleNodesMapper.from(nodesModel.nodes).map(handlers).get(),
            overlay: {
                onMouseDown: e => selectionWindow.onOverlayMouseDown(viewState, e)
            }
        };
    };
}
