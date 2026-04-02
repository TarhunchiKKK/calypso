import type { StickerNode } from "@repo/boards-common";
import { NodeWrapper } from "@/board-editor/core";
import { StickerComponent } from "./sticker.component";

export class StickerNodeWrapper extends NodeWrapper<StickerNode> {
    public override get rect() {
        return this.node.rect;
    }

    // QUESTION: is this method necessary?
    public override clone(data: Partial<StickerNode> = {}) {
        return new StickerNodeWrapper({ ...this.node, ...data });
    }

    public override render(children?: React.ReactNode) {
        return (
            <StickerComponent
                key={this.node.id}
                node={this.node}
                handlers={this.handlers}
                showContent={this.showContent}
                children={children}
            />
        );
    }
}
