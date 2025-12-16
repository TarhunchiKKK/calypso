import { OmitFields } from "@/shared/lib/typescript";
import { useSelectionWindow } from "../../hooks/use-selection-window";
import { ViewModel, ViewModelParams } from "../../types";
import { IdleViewState } from "./view-state";
import { switchToSelection } from "../selection/switcher";
import { switchToEditing } from "../editing/switcher";
import { useMouseEventsMediators } from "../../hooks/use-mouse-events-mediators";
import React from "react";
import { getNodeId } from "@/features/board-editor/domain/dom";

export function useIdleViewModel(params: ViewModelParams) {
    const { nodesModel, setViewState } = params;

    const selectionWindow = useSelectionWindow(params);

    const mediators = useMouseEventsMediators();

    return (viewState: IdleViewState): OmitFields<ViewModel, "actions"> => {
        const handlers = mediators.node.createHandlers({
            onClick: (e: React.MouseEvent) => {
                const nodeId = getNodeId(e);
                if (!nodeId) {
                    return;
                }

                setViewState(switchToSelection({ selectedIds: new Set([nodeId]) }));
            },
            onDoubleClick: (e: React.MouseEvent) => {
                const nodeId = getNodeId(e);
                if (!nodeId) {
                    return;
                }

                setViewState(switchToEditing({ selectedNodeId: nodeId }));
            }
        });

        return {
            nodes: nodesModel.nodes.map(node => node.clone().setHandler("onClick", handlers.onClick)),
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
