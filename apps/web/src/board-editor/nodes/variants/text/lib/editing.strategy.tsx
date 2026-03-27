import type { Descendant } from "slate";
import { NodeEditingStrategy } from "@/board-editor/modules/editing";
import { FormatableTextarea } from "@/features/formatable-input";
import type { Boards } from "@repo/common";

export class EditTextNodeStrategy extends NodeEditingStrategy {
    private value: Descendant[] = [];

    public override ui(node: Boards.TextNode) {
        const changeHandler = (value: Descendant[]) => {
            this.value = value;
        };

        // FIX: type casting
        const endEditingHandler = () => {
            this.handler({ ...node, text: this.value } as any);
        };

        // FIX: type casting
        return <FormatableTextarea value={node.text as any} onChange={changeHandler} onBlur={endEditingHandler} />;
    }
}
