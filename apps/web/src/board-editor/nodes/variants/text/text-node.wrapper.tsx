import type { Boards } from "@repo/common";
import { NodeWrapper } from "@/board-editor/core";
import { TextNodeComponent } from "./text-node.component";

export class TextNodeWrapper extends NodeWrapper<Boards.TextNode> {
    public override get rect() {
        return this.node.rect;
    }

    public override clone(data: Partial<Boards.TextNode> = {}) {
        return new TextNodeWrapper({ ...this.node, ...data });
    }

    public override render(children?: React.ReactNode) {
        return (
            <TextNodeComponent
                key={this.node.id}
                node={this.node}
                handlers={this.handlers}
                showContent={this.showContent}
                children={children}
            />
        );
    }
}
