import type { NodeBase } from "@repo/common";
import { NodesMapper } from "@/features/board-editor/core";
import { NodeDecoratorsFactory } from "@/features/board-editor/nodes";

export class StylingNodesMapper extends NodesMapper {
    public static from(nodes: NodeBase[]) {
        return new StylingNodesMapper(nodes);
    }

    public applySelection(selectedIds: Set<string>) {
        this.nodes = this.nodes.map(node => (selectedIds.has(node.id) ? NodeDecoratorsFactory.select(node) : node)) as any[];
        return this;
    }
}
