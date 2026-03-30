import { NodeWrapper } from "@/board-editor/core";
import { Geometry } from "@/shared/lib/geometry";
import type { Boards } from "@repo/common";
import { ArrowNodeComponent } from "./arrow-node.component";

export class ArrowNodeWrapper extends NodeWrapper<Boards.ArrowNode> {
    public override get rect() {
        return Geometry.rectFromPoints(this.node.start, this.node.end)
    }

    public override clone() {
        return this;
    }

    public override render(children?: React.ReactNode) {
        return <ArrowNodeComponent key={this.node.id} node={this.node} handlers={this.handlers}>{children}</ArrowNodeComponent>;
    }
}