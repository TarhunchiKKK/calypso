import type React from "react";
import { NodeWrapper } from "@/features/board-editor/core";
import { StickerComponent } from "./sticker.component";
import type { StickerNode } from "./sticker.type";

export class StickerNodeWrapper extends NodeWrapper<StickerNode> {
    public override get rect() {
        return this.node.rect;
    }

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
