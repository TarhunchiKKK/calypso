import { Point } from "@/features/board-editor/domain/geometry";
import { ReactNode } from "react";
import { NodeImpl, NodeHandlers } from "../base";
import { StickerNode } from "./type";
import { StickerComponent } from "./ui";

export class Sticker extends NodeImpl {
    public constructor(
        protected node: StickerNode,
        protected handlers: NodeHandlers = {}
    ) {
        super(node, handlers);
    }

    public clone() {
        return new Sticker({ ...this.node });
    }

    public rect() {
        return {
            x: this.node.x,
            y: this.node.y,
            width: this.node.width,
            height: this.node.height
        };
    }

    public moveTo(point: Point) {
        this.node.x = point.x;
        this.node.y = point.y;
        return this;
    }

    public render(): ReactNode {
        return (
            <StickerComponent
                key={this.node.id}
                node={this.node}
                isSelected={this.isSelected}
                resizable={this.resizable}
                handlers={this.handlers}
            />
        );
    }
}
