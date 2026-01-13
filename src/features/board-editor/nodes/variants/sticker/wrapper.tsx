import type React from "react";
import { NodeWrapper, type Point } from "@/features/board-editor/core";
import { StickerComponent } from "./component";
import type { StickerNode } from "./type";

export class StickerNodeWrapper extends NodeWrapper<StickerNode> {
    public override get rect() {
        return this.node.rect;
    }

    public override clone(data: Partial<StickerNode> = {}) {
        return new StickerNodeWrapper({ ...this.node, ...data });
    }

    public override moveTo(point: Point) {
        this.node.rect.x = point.x;
        this.node.rect.y = point.y;
        return this;
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
