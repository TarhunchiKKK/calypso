import type { ShapeNode } from "@repo/boards";
import type React from "react";
import { NodeWrapper } from "@/board-editor/core";
import { ShapeNodeComponent } from "./component";

export class ShapeNodeWrapper extends NodeWrapper<ShapeNode> {
    public override render(children?: React.ReactNode) {
        return <ShapeNodeComponent key={this.node.id} node={this.node} handlers={this.handlers} children={children} />;
    }
}
