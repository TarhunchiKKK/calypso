import type { ArrowNode } from "@repo/boards-common";
import { NodeWrapper } from "@/board-editor/core";
import type { ArrowAbsolutePosition } from "@/board-editor/modules/arrows-resolution/types";
import { Geometry } from "@/shared/lib/geometry";
import { ArrowNodeComponent } from "./arrow-node.component";

export class ArrowNodeWrapper extends NodeWrapper<ArrowNode> {
    public constructor(
        protected node: ArrowNode,
        public absolutePosition: ArrowAbsolutePosition
    ) {
        super(node);
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
