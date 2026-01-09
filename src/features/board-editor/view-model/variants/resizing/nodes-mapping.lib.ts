import { NodesMapper } from "@/features/board-editor/core";
import { ResizingViewState } from "./view-state";
import { Rect } from "@/features/board-editor/core";
import { AnyNode } from "@/features/board-editor/nodes";

export class ResizingNodesMapper extends NodesMapper {
    public static from(nodes: AnyNode[]) {
        return new ResizingNodesMapper(nodes);
    }

    public map(viewState: ResizingViewState, newSize?: Rect) {
        this.nodes = this.nodes.map(node => {
            if (viewState.nodeId === node.id) {
                const temp = node.clone().select(true);

                return newSize ? temp.resize(newSize) : temp;
            }

            return node;
        });

        return this;
    }

    public unselectCurrent(viewState: ResizingViewState) {
        this.nodes = this.nodes.map(node => {
            if (viewState.nodeId === node.id) {
                return node.clone();
            }

            return node;
        });

        return this;
    }
}
