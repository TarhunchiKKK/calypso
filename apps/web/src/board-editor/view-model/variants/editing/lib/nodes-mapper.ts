import type { Id } from "@repo/common";
import { NodesMapper } from "@/board-editor/core";
import type { NodeEditingHandlers } from "@/board-editor/modules/editing";
import { DecoratableNodeBuilder } from "@/board-editor/nodes/compose/lib/decoratable-node.builder";

export class EditingNodesMapper extends NodesMapper {
    private selectedNodeId!: Id;

    private editingHandlers!: NodeEditingHandlers;

    public static create() {
        return new EditingNodesMapper();
    }

    public setSelectedNodeId(selectedNodeId: Id) {
        this.selectedNodeId = selectedNodeId;
        return this;
    }

    public setEditingHandlers(editingHandlers: NodeEditingHandlers) {
        this.editingHandlers = editingHandlers;
        return this;
    }

    public override map() {
        return this.wrapNodes().map((wrapper) => {
            if (this.selectedNodeId === wrapper.id) {
                return DecoratableNodeBuilder.from(wrapper).selection().editing(this.editingHandlers).build();
            }

            return wrapper;
        });
    }
}
