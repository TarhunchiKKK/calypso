import type { NoteNode } from "@repo/boards-common";
import { NodeWrapper } from "@/board-editor/core";
import { NoteNodeComponent } from "./component";

export class NoteNodeWrapper extends NodeWrapper<NoteNode> {
    public override render(children?: React.ReactNode) {
        return <NoteNodeComponent key={this.node.id} node={this.node} handlers={this.handlers} uiSettings={this.uiSettings} children={children} />;
    }
}
