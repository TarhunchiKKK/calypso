import type { ArrowNode } from "@lib/boards";
import { NodeWrapper } from "@/board-editor/core";
import { isResolvedArrow } from "@/board-editor/modules/arrows-resolution";
import { ArrowNodeComponent } from "./component";

export class ArrowNodeWrapper extends NodeWrapper<ArrowNode> {
    public constructor(protected node: ArrowNode) {
        super(node);
    }

    public override render(children?: React.ReactNode) {
        if (!isResolvedArrow(this.node)) {
            throw new Error(`Arrow is not resolved: ${this.node}`);
        }

        return <ArrowNodeComponent key={this.node.id} node={this.node} uiSettings={this.uiSettings} handlers={this.handlers} children={children} />;
    }
}
