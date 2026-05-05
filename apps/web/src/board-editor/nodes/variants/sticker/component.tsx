import type { StickerNode } from "@repo/boards-common";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import { TextareaAutoFontSize } from "@/shared/ui";

type Props = PropsWithChildren<{
    node: StickerNode;

    handlers: NodeHandlers;

    uiSettings: NodeUiSettings;
}>;

export function StickerComponent({ node, handlers, uiSettings, children }: Props) {
    const wrapperStyles: CSSProperties = {
        width: node.rect.width,
        height: node.rect.height,
        left: node.rect.x,
        top: node.rect.y,

        backgroundColor: node.styles.backgroundColor,
        borderStyle: node.styles.borderStyle,
        borderColor: node.styles.borderColor,
        borderRadius: node.styles.borderRadius
    };

    const textareaStyles: CSSProperties = {
        fontFamily: node.styles.fontFamily,
        fontSize: node.styles.fontSize,
        color: node.styles.textColor,
        textAlign: node.styles.textAlign
    };

    return (
        <div data-id={node.id} className="absolute shadow-md cursor-pointer" style={wrapperStyles} {...handlers}>
            <div className="relative w-full h-full px-2 py-4">
                {uiSettings.showContent && <TextareaAutoFontSize value={node.text} styles={textareaStyles} className="pointer-events-none" />}

                {children}
            </div>
        </div>
    );
}
