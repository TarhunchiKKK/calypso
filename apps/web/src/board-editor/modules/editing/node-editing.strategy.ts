import type { NodeBase } from "@repo/boards-common";
import type { Decoratable } from "@/board-editor/core";
import type { NodeEditingHandlers } from "./types";

export abstract class NodeEditingStrategy {
    public abstract ui(node: Decoratable<NodeBase>, handlers: NodeEditingHandlers): React.ReactNode;
}
