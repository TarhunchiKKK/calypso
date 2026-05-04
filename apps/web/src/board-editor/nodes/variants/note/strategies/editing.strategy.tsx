import type { NoteNode } from "@repo/boards-common";
import type { FormattableElement } from "@repo/common";
import type { CSSProperties } from "react";
import type { Decoratable } from "@/board-editor/core";
import { type NodeEditingHandlers, NodeEditingStrategy } from "@/board-editor/modules/editing";
import { FormattableDocument } from "@/features/formatting";

export class NoteNodeEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<NoteNode>, handlers: NodeEditingHandlers) {
        const handleChange = (value: FormattableElement[]) => {
            const newNode = {
                ...node.data,
                content: value
            } satisfies NoteNode;

            handlers.change(newNode);
        };

        const styles: CSSProperties = {
            backgroundColor: node.data.styles.backgroundColor,
            borderColor: node.data.styles.borderColor
        };

        const keyHandlers = {
            Escape: handlers.end
        };

        return <FormattableDocument value={node.data.content} onChange={handleChange} styles={styles} keyHandlers={keyHandlers} />;
    }
}
