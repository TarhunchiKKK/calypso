import { useState } from "react";
import { selectNodes } from "@/board-editor/modules/selection";
import { Geometry } from "@/shared/lib/geometry";
import type { ViewModelParams } from "../../../types";
import { switchToIdle } from "../../idle/switcher";
import { switchToSelection } from "../../selection/switcher";
import type { SelectionWindowViewState } from "../view-state";
import type { Rect } from "@repo/common";
import { NodeRectsFactory } from "@/board-editor/nodes/compose/factories/node-rects.factory";

export function useSelectionWindow({ nodesModel, layoutDimensionsModel, setViewState }: ViewModelParams) {
    const [selectionWindowRect, setSelectionWindowRect] = useState<Rect>();

    let selectedNodesIds: string[] = [];
    if (selectionWindowRect) {
        selectedNodesIds = nodesModel.nodes
            .filter(node => Geometry.rectsIntersecting(selectionWindowRect, NodeRectsFactory.rect(node)))
            .map(node => node.id);
    }

    const onWindowMouseMove = (viewState: SelectionWindowViewState, e: MouseEvent) => {
        const currentPoint = layoutDimensionsModel.applyForPoint(Geometry.pointFromEvent(e));

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
