import type React from "react";
import { NodeWrapper } from "@/board-editor/core";
import { ShapeNodeComponent } from "./shape-node.component";
import type { ShapeNode } from "./shape-node.type";

export class ShapeNodeNodeWrapper extends NodeWrapper<ShapeNode> {
    public override get rect() {
        return this.node.rect;
    }

    public override clone() {
        // implementation...
        return this;
    }

    public override render(children?: React.ReactNode) {
        return <ShapeNodeComponent key={this.node.id} node={this.node} handlers={this.handlers} children={children} />;
    }
}
