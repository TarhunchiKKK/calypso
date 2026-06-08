import type { TextNode } from "@lib/boards";
import { NodeWrapper } from "@/board-editor/core";
import { TextNodeComponent } from "./component";

export class TextNodeWrapper extends NodeWrapper<TextNode> {
    public override render(children?: React.ReactNode) {
        return <TextNodeComponent key={this.node.id} node={this.node} handlers={this.handlers} uiSettings={this.uiSettings} children={children} />;
    }
}
