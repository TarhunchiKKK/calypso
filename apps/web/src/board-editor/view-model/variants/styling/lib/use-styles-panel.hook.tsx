import type { Point } from "@repo/common";
import type { PropsWithChildren } from "react";
import { StylesPanel } from "@/board-editor/modules/styling";
import type { NodesModel } from "@/board-editor/nodes";
import type { StylingViewState } from "../view-state";

function StylesPanelWrapper({ point, children }: PropsWithChildren & { point: Point }) {
    return (
        <div style={{ left: point.x, top: point.y }} className="absolute -translate-x-1/2 -translate-y-1/2">
            {children}
        </div>
    );
}

export function useStylesPanel(nodesModel: NodesModel) {
    return (viewState: StylingViewState) => {
        const nodeTypes = nodesModel.nodes.filter((node) => viewState.nodeIds.has(node.id)).map((node) => node.type);

        const uniqueNodeTypes = new Set(nodeTypes);

        switch (uniqueNodeTypes.size) {
            case 0: {
                return null;
            }
            case 1: {
                const nodeType = uniqueNodeTypes.values().next().value;

                if (!nodeType) {
                    throw Error("Set should contain items");
                }

                return (
                    <StylesPanelWrapper point={viewState.position}>
                        <StylesPanel type={nodeType} update={nodesModel.service.updateManyWithFn.bind(null, viewState.nodeIds)} />
                    </StylesPanelWrapper>
                );
            }
            default: {
                return (
                    <StylesPanelWrapper point={viewState.position}>
                        <StylesPanel type={null} update={nodesModel.service.updateManyWithFn.bind(null, viewState.nodeIds)} />
                    </StylesPanelWrapper>
                );
            }
        }
    };
}
