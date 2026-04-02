import type { Boards } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { NodeEditingStrategy } from "@/board-editor/modules/editing";
import { TextareaAutoSize } from "@/shared/ui";

export class StickerEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<Boards.StickerNode>) {
        const onEditingEnd = (text: string) => {
            const newNode = {
                ...node.data,
                text: text
            };

            this.handler(newNode);
        };

        return <TextareaAutoSize value={node.data.text} onEditingEnd={onEditingEnd} />;
    }
}
