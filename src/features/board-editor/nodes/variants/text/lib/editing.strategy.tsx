import type { Descendant } from "slate";
import { EditNodeStrategy } from "@/features/board-editor/modules/editing";
import { FormatableTextarea } from "@/shared/ui/formatable-input";
import type { TextNode } from "../type";

export class EditTextNodeStrategy extends EditNodeStrategy {
    private value: Descendant[] = [];

    public override ui(node: TextNode) {
        const changeHandler = (value: Descendant[]) => {
            this.value = value;
        };

        const endEditingHandler = () => {
            this.handler({ ...node, text: this.value } as TextNode);
        };

        return <FormatableTextarea value={node.text} onChange={changeHandler} onBlur={endEditingHandler} />;
    }
}
