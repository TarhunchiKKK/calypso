import type { Boards } from "@repo/common";
import { NodeWrapper } from "@/board-editor/core";
import { Geometry } from "@/shared/lib/geometry";
import { ArrowNodeComponent } from "./arrow-node.component";
import type { ArrowPosition } from "./lib/arrow.types";

export class ArrowNodeWrapper extends NodeWrapper<Boards.ArrowNode> {
    public absolutePosition!: ArrowPosition;

    public setAbsolutePosition(position: ArrowPosition) {
        this.absolutePosition = position;
    }

    public override get rect() {
        return Geometry.rectFromPoints(this.node.start, this.node.end);
    }

    public override clone() {
        return this;
    }

    public override render(children?: React.ReactNode) {
        return (
            <ArrowNodeComponent
                key={this.node.id}
                node={this.node}
                absolutePosition={this.absolutePosition}
                handlers={this.handlers}
            >
                {children}
            </ArrowNodeComponent>
        );
    }
}
