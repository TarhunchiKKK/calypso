import type { NodeBase, TextNode } from "@repo/boards-common";
import type { FormattableElement } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { NodeEditingStrategy } from "@/board-editor/modules/editing";
import { FormattableText } from "@/features/formatting";

export class TextNodeEditingStrategy extends NodeEditingStrategy {
    private value: FormattableElement[] = [];

    public override ui(node: Decoratable<TextNode>, handler: (node: NodeBase) => void) {
        const changeHandler = (value: FormattableElement[]) => {
            this.value = value;
        };

        const endEditingHandler = () => {
            const newNode = {
                ...node.data,
                content: this.value
            };
            handler(newNode);
        };

        return <FormattableText value={node.data.content} onChange={changeHandler} onBlur={endEditingHandler} />;
    }
}
