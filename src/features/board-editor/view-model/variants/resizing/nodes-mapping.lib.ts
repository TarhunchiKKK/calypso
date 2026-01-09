import { NodesMapper } from "@/features/board-editor/core";
import { ResizingViewState } from "./view-state";
import { Rect } from "@/features/board-editor/core";
import { AnyNode } from "@/features/board-editor/nodes";

export class ResizingNodesMapper extends NodesMapper {
    private constructor(
        inputNodes: AnyNode[],
        private viewState: ResizingViewState
    ) {
        super(inputNodes);
    }

    public static from(nodes: AnyNode[], viewState: ResizingViewState) {
        return new ResizingNodesMapper(nodes, viewState);
    }

    public applyResizing(newSize?: Rect) {
        this.nodes = this.nodes.map(node => {
            if (this.viewState.nodeId === node.id) {
                const temp = node.clone().select(true);

                return newSize ? temp.resize(newSize) : temp;
            }

            return node;
        });

        return this;
    }

    public unselectCurrent() {
        this.nodes = this.nodes.map(node => {
            if (this.viewState.nodeId === node.id) {
                return node.clone();
            }

            return node;
        });

        return this;
    }
}
