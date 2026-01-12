import { StickerNode } from "./type";
import { StickerComponent } from "./component";
import { NodeWrapper, Point, Rect } from "@/features/board-editor/core";
import React from "react";

export class StickerNodeWrapper extends NodeWrapper<StickerNode> {
    public override clone(data: Partial<StickerNode> = {}) {
        return new StickerNodeWrapper({ ...this.node, ...data });
    }

    public override rect() {
        return this.node.rect;
    }

    public override setRect(rect: Rect) {
        this.node.rect = rect;
        return this;
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
