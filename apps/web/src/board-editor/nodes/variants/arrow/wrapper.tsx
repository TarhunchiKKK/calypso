import type { ArrowNode } from "@repo/boards";
import { NodeWrapper } from "@/board-editor/core";
import type { ArrowAbsolutePosition } from "@/board-editor/modules/arrows-resolution/types";
import { ArrowNodeComponent } from "./component";

export class ArrowNodeWrapper extends NodeWrapper<ArrowNode> {
    public constructor(
        protected node: ArrowNode,
        public absolutePosition: ArrowAbsolutePosition
    ) {
        super(node);
    }

    public override render(children?: React.ReactNode) {
        return (
            <ArrowNodeComponent
                key={this.node.id}
                node={this.node}
                absolutePosition={this.absolutePosition}
                uiSettings={this.uiSettings}
                handlers={this.handlers}
                children={children}
            />
        );
    }
}
