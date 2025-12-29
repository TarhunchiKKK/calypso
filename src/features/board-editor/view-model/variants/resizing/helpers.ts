import { NodesMapper } from "@/features/board-editor/view-model/lib/nodes-mapper";
import { NodeImpl } from "@/features/board-editor/nodes/variants/base";
import { ResizingViewState } from "./view-state";
import { Rect } from "@/features/board-editor/lib/geometry";

export class ResizingNodesMapper extends NodesMapper {
    private constructor(
        nodes: NodeImpl[],
        private viewState: ResizingViewState
    ) {
        super(nodes);
    }

    public static from(nodes: NodeImpl[], viewState: ResizingViewState) {
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
