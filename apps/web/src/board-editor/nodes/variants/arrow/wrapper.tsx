import { NodeWrapper } from "@/board-editor/core";
import type { ResolvedArrow } from "@/board-editor/modules/arrows-resolution";
import { ArrowNodeComponent } from "./component";

export class ArrowNodeWrapper extends NodeWrapper<ResolvedArrow> {
    public constructor(protected node: ResolvedArrow) {
        super(node);
    }

    public override render(children?: React.ReactNode) {
        return <ArrowNodeComponent key={this.node.id} node={this.node} uiSettings={this.uiSettings} handlers={this.handlers} children={children} />;
    }
}
