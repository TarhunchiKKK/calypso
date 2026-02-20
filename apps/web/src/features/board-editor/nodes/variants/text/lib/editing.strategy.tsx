import type { TextNode } from "@repo/common";
import type { Descendant } from "slate";
import { NodeEditingStrategy } from "@/features/board-editor/modules/editing";
import { FormatableTextarea } from "@/shared/ui/formattable-input";

export class EditTextNodeStrategy extends NodeEditingStrategy {
    private value: Descendant[] = [];

    public override ui(node: TextNode) {
        const changeHandler = (value: Descendant[]) => {
            this.value = value;
        };

        const endEditingHandler = () => {
            this.handler({ ...node, text: this.value as any } as TextNode);
        };

        return <FormatableTextarea value={node.text as any} onChange={changeHandler} onBlur={endEditingHandler} />;
    }
}
