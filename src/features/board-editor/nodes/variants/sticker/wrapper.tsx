import { StickerNode } from "./type";
import { StickerComponent } from "./component";
import { NodeWrapper, Point, Rect } from "@/features/board-editor/core";
import React from "react";

export class StickerNodeWrapper extends NodeWrapper<StickerNode> {
    public override clone(data: Partial<StickerNode> = {}) {
        return new StickerNodeWrapper({ ...this.node, ...data });
    }

    public override rect() {
        return {
            x: this.node.x,
            y: this.node.y,
            width: this.node.width,
            height: this.node.height
        };
    }

    public override setRect(rect: Rect) {
        this.node.x = rect.x;
        this.node.y = rect.y;
        this.node.width = rect.width;
        this.node.height = rect.height;
        return this;
    }

    public override moveTo(point: Point) {
        this.node.x = point.x;
        this.node.y = point.y;
        return this;
    }

    public override render(children?: React.ReactNode) {
        return (
            <StickerComponent
                key={this.node.id}
                node={this.node}
                // CURRENT: this prop will be deleted
                isEditing={this.isEditing}
                handlers={this.handlers}
                children={children}
            />
        );
    }
}
