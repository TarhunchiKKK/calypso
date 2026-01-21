import type React from "react";
import { NodeWrapper } from "@/features/board-editor/core";
import { TextNodeComponent } from "./text-node.component";
import type { TextNode } from "./text-node.type";

export class TextNodeWrapper extends NodeWrapper<TextNode> {
    public override get rect() {
        return this.node.rect;
    }

    public override clone(data: Partial<TextNode> = {}) {
        return new TextNodeWrapper({ ...this.node, ...data });
    }

    public override render(children?: React.ReactNode) {
        return <TextNodeComponent key={this.node.id} node={this.node} handlers={this.handlers} showContent={this.showContent} children={children} />;
    }
}
