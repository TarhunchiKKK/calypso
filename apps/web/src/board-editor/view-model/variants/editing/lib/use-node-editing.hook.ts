import type { NodeBase } from "@repo/boards";
import { useState } from "react";
import type { NodeEditingHandlers } from "@/board-editor/modules/editing";
import type { ViewModelParams } from "@/board-editor/view-model/types";
import { switchToIdle } from "../../idle/switcher";

export function useNodeEditing({ nodesModel, setViewState }: ViewModelParams): NodeEditingHandlers {
    const [editingNode, setEditingNode] = useState<NodeBase>();

    const handleEditingEnd = () => {
        if (!editingNode) {
            return;
        }

        nodesModel.service.updateOne(editingNode);

        setEditingNode(undefined);

        setViewState(switchToIdle());
    };

    return {
        change: setEditingNode,
        end: handleEditingEnd
    };
}
