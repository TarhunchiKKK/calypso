import { type NodeBase, NodesMapper } from "@/board-editor/core";
import { NodeDecoratorsFactory } from "@/board-editor/nodes";

export class StylingNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new StylingNodesMapper(nodes);
    }

    public applySelection(selectedIds: Set<string>) {
        this.nodes = this.nodes.map(node => (selectedIds.has(node.id) ? NodeDecoratorsFactory.select(node) : node)) as any[];
        return this;
    }
}
