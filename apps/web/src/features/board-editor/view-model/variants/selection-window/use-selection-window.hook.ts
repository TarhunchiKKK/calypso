import type { Rect } from "@repo/common";
import { useState } from "react";
import { Geometry } from "@/features/board-editor/core";
import { selectNodes } from "@/features/board-editor/modules/selection";
import { NodeDecoratorsFactory } from "@/features/board-editor/nodes";
import type { ViewModelParams } from "../../types";
import { switchToIdle } from "../idle/switcher";
import { switchToSelection } from "../selection/switcher";
import type { SelectionWindowViewState } from "./view-state";

export function useSelectionWindow({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [selectionWindowRect, setSelectionWindowRect] = useState<Rect>();

    let selectedNodesIds: string[] = [];
    if (selectionWindowRect) {
        selectedNodesIds = nodesModel.nodes
            .map(node => NodeDecoratorsFactory.wrap(node))
            .filter(node => Geometry.rectsIntersecting(selectionWindowRect, node.rect))
            .map(node => node.id);
    }

    const onWindowMouseMove = (viewState: SelectionWindowViewState, e: MouseEvent) => {
        const currentPoint = layoutDimensionsModel.applyForPoint({ x: e.clientX, y: e.clientY });

        setSelectionWindowRect(Geometry.rectFromPoints(viewState.startPoint, currentPoint));
    };

    const onWindowMouseUp = (viewState: SelectionWindowViewState) => {
        const selection = selectNodes(selectedNodesIds, viewState.selectionMode, viewState.selectedIds);

        if (selection.size === 0) {
            setViewState(switchToIdle());
        } else {
            setViewState(switchToSelection({ selectedIds: selection, skipNextClick: true }));
        }

        setSelectionWindowRect(undefined);
    };

    return {
        rect: selectionWindowRect,
        selectedNodesIds: new Set(selectedNodesIds),
        onWindowMouseMove,
        onWindowMouseUp
    };
}
