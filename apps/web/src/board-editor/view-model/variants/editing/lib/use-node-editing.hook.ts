import type { NodeBase } from "@repo/boards-common";
import { useState } from "react";
import type { NodeEditingHandlers } from "@/board-editor/modules/editing";
import type { ViewModelParams } from "@/board-editor/view-model/types";

export function useNodeEditing(nodesModel: ViewModelParams["nodesModel"]): NodeEditingHandlers {
    const [editingNode, setEditingNode] = useState<NodeBase>();

    const handleEditingEnd = () => {
        if (!editingNode) {
            return;
        }

        nodesModel.service.updateOne(editingNode);

        setEditingNode(undefined);
    };

    return {
        change: setEditingNode,
        end: handleEditingEnd
    };
}
