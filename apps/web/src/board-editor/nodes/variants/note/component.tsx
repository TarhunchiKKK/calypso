import type { NoteNode } from "@repo/boards-common";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import { FormattableDocument } from "@/features/formatting";

type Props = PropsWithChildren<{
    node: NoteNode;

    handlers: NodeHandlers;

    uiSettings: NodeUiSettings;
}>;

export function NoteNodeComponent({ node, handlers, uiSettings, children }: Props) {
    const wrapperStyles: CSSProperties = {
        top: node.rect.y,
        left: node.rect.x,
        width: node.rect.width,
        height: node.rect.height
    };

    const editorStyles: CSSProperties = {
        backgroundColor: node.styles.backgroundColor,
        borderColor: node.styles.borderColor
    }

    return (
        <div data-id={node.id} className="absolute rounded-xs shadow-md cursor-pointer" style={wrapperStyles} {...handlers}>
            <div className="relative w-full h-full">
                {uiSettings.showContent && <FormattableDocument value={node.content} styles={editorStyles} className="pointer-events-none" />}

                {children}
            </div>
        </div>
    );
}
