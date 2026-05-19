import type { DrawingNode } from "@repo/boards";
import { NodeWrapper } from "@/board-editor/core";
import { DrawingNodeComponent } from "./component";

export class DrawingNodeWrapper extends NodeWrapper<DrawingNode> {
    public override render(children?: React.ReactNode) {
        return <DrawingNodeComponent key={this.node.id} node={this.node} handlers={this.handlers} uiSettings={this.uiSettings} children={children} />;
    }
}
