import type { NodeBase } from "@repo/boards-common";
import type { Id } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";

export class EditingNodesMapper extends NodesMapper {
    private selectedNodeId!: Id;

    private endEditingHandler!: (node: NodeBase) => void;

    public static create() {
        return new EditingNodesMapper();
    }

    public setSelectedNodeId(selectedNodeId: Id) {
        this.selectedNodeId = selectedNodeId;
        return this;
    }

    public setEndEditingHandler(endEditingHandler: (node: NodeBase) => void) {
        this.endEditingHandler = endEditingHandler;
        return this;
    }

    public override map() {
        return this.wrapNodes().map(wrapper => {
            if (this.selectedNodeId === wrapper.id) {
                return DecoratableNodeBuilder.from(wrapper).selection().editing(this.endEditingHandler).build();
            }

            return wrapper;
        });
    }
}
