import { OmitFields } from "@/shared/lib/typescript.lib";
import { useSelectionWindow } from "../../hooks/use-selection-window.hook";
import { ViewModel, ViewModelParams } from "../../types";
import { IdleViewState } from "./view-state";
import { switchToSelection } from "../selection/switcher";
import { switchToEditing } from "../editing/switcher";
import { useMouseEventsMediators } from "../../hooks/use-mouse-events-mediators.hook";
import { withNodeId } from "@/features/board-editor/nodes/lib/dom.lib";
import { useDragging } from "../../hooks/use-dragging.hook";
import { IdleNodesMapper } from "./nodes-mapper.lib";

export function useIdleViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSelectionWindow(params);

    const dragging = useDragging(params);

    const mediators = useMouseEventsMediators();

    return (viewState: IdleViewState): OmitFields<ViewModel, "actions"> => {
        const handlers = mediators.node.createHandlers({
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
            nodes: IdleNodesMapper.from(nodesModel.nodes).clone().applyHandlers(handlers).get(),
            overlay: {
                onMouseDown: e => selectionWindow.onOverlayMouseDown(viewState, e)
            }
        };
    };
}
