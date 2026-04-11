import type { MediaNode } from "@repo/boards-common";
import { NodeWrapper } from "@/board-editor/core";
import { MediaNodeComponent } from "./component";

export class MediaNodeWrapper extends NodeWrapper<MediaNode> {
    public override render(children?: React.ReactNode) {
        return <MediaNodeComponent key={this.node.id} node={this.node} handlers={this.handlers} children={children} />;
    }
}
