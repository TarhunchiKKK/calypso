import type { StickerNode } from "@repo/boards-common";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";

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

    const contentStyles: CSSProperties = {
        fontFamily: node.styles.fontFamily,
        fontSize: node.styles.fontSize,
        color: node.styles.textColor,
        textAlign: node.styles.textAlign
    };

    return (
        <div data-id={node.id} className="absolute shadow-md cursor-pointer" style={wrapperStyles} {...handlers}>
            <div className="relative w-full h-full px-2 py-4">
                {uiSettings.showContent && (
                    <div style={contentStyles} className="whitespace-pre-wrap w-full h-full overflow-hidden wrap-break-word break-all">
                        {node.text}
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}
