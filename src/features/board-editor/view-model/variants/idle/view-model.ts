import { OmitFields } from "@/shared/lib/typescript";
import { useSelectionWindow } from "../../hooks/use-selection-window";
import { ViewModel, ViewModelParams } from "../../types";
import { IdleViewState } from "./view-state";
import { switchToSelection } from "../selection/switcher";
import { switchToEditing } from "../editing/switcher";
import { useMouseEventsMediators } from "../../hooks/use-mouse-events-mediators";
import { withNodeId } from "@/features/board-editor/domain/dom";
import { useDragging } from "../../hooks/use-dragging";
import { IdleNodesMapper } from "./helpers";

export function useIdleViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSelectionWindow(params);

    const dragging = useDragging(params);

    const mediators = useMouseEventsMediators();

    return (viewState: IdleViewState): OmitFields<ViewModel, "actions"> => {
        const handlers = mediators.node.createHandlers({
            onMouseDown: withNodeId((nodeId, e) => {
                dragging.onMouseDown(viewState, e, new Set([nodeId]));
            }),
            onClick: withNodeId(nodeId => {
                setViewState(switchToSelection({ selectedIds: new Set([nodeId]) }));
            }),
            onDoubleClick: withNodeId(nodeId => {
                setViewState(switchToEditing({ selectedNodeId: nodeId }));
            })
        });

        return {
            nodes: IdleNodesMapper.from(nodesModel.nodes).clone().applyHandlers(handlers).get(),
            overlay: {
                onMouseDown: e => selectionWindow.onOverlayMouseDown(viewState, e)
            }
        };
    };
}
