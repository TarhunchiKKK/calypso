import { OmitFields } from "@/shared/lib/typescript";
import { useSelectionWindow } from "../../hooks/use-selection-window";
import { ViewModel, ViewModelParams } from "../../types";
import { IdleViewState } from "./view-state";
import { switchToSelection } from "../selection/switcher";
import { switchToEditing } from "../editing/switcher";
import { useMouseEventsMediators } from "../../hooks/use-mouse-events-mediators";

export function useIdleViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSelectionWindow(params);

    const mediators = useMouseEventsMediators();

    return (viewState: IdleViewState): OmitFields<ViewModel, "actions"> => {
        const handleMouseDown = (nodeId: string) => {
            setViewState(switchToSelection({ selectedIds: new Set([nodeId]) }));
        };

        const handleDoubleClick = (nodeId: string) => {
            setViewState(switchToEditing({ selectedNodeId: nodeId }));
        };

        return {
            nodes: nodesModel.nodes
                .map(node => node.clone())
                .map(node => {
                    const handlers = mediators.node.createHandlers({
                        onMouseDown: () => handleMouseDown(node.id),
                        onDoubleClick: () => handleDoubleClick(node.id)
                    });
                    return node.setHandler("onMouseDown", handlers.onMouseDown).setHandler("onClick", handlers.onClick);
                }),
            // .map(node => node.setHandler("onMouseDown", () => handleMouseDown(node.id)))
            // .map(node => node.setHandler("onDoubleClick", () => handleDoubleClick(node.id))),
            overlay: {
                onMouseDown: selectionWindow.onOverlayMouseDown
            },
            window: {
                onMouseMove: e => selectionWindow.onWindowMouseMove(viewState, e),
                onMouseUp: selectionWindow.reset
            }
        };
    };
}
