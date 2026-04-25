import type { NodeBase, TextNode } from "@repo/boards-common";
import type { Descendant } from "slate";
import type { Decoratable } from "@/board-editor/core";
import { NodeEditingStrategy } from "@/board-editor/modules/editing";
import { FormatableTextarea } from "@/features/formatable-input";

export class TextNodeEditingStrategy extends NodeEditingStrategy {
    private value: Descendant[] = [];

    public override ui(node: Decoratable<TextNode>,  handler: (node: NodeBase) => void) {
        const changeHandler = (value: Descendant[]) => {
            this.value = value;
        };

        // FIX: type casting
        const endEditingHandler = () => {
            handler({ ...node, text: this.value } as any);
        };

        // FIX: type casting
        return <FormatableTextarea value={node.data.text as any} onChange={changeHandler} onBlur={endEditingHandler} />;
    }
}
