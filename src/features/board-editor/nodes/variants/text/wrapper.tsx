import { NodeWrapper, type Point } from "@/features/board-editor/core";
import type { TextNode } from "./type";

export class TextNodeWrapper extends NodeWrapper<TextNode> {
    public override get rect() {
        return this.node.rect;
    }

    public override clone() {
        // implementation...
        return this;
    }

    public override moveTo(point: Point) {
        // implementation...
        return this;
    }

    public override render() {
        return <>{/* implementation... */}</>;
    }
}
