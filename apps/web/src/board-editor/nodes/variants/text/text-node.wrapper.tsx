import type { TextNode } from "@repo/boards-common";
import { NodeWrapper } from "@/board-editor/core";
import { TextNodeComponent } from "./text-node.component";

export class TextNodeWrapper extends NodeWrapper<TextNode> {
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
