import type { StickerNode } from "@repo/boards-common";
import { NodeWrapper } from "@/board-editor/core";
import { StickerComponent } from "./component";

export class StickerNodeWrapper extends NodeWrapper<StickerNode> {
    public override render(children?: React.ReactNode) {
        return <StickerComponent key={this.node.id} node={this.node} handlers={this.handlers} showContent={this.showContent} children={children} />;
    }
}
