import type { Boards } from "@repo/common";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers } from "@/board-editor/core";

type Props = PropsWithChildren<{
    node: Boards.StickerNode;

    handlers: NodeHandlers;

    showContent: boolean;
}>;

export function StickerComponent({ node, handlers, showContent, children }: Props) {
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

    const textStyles: CSSProperties = {
        fontFamily: node.styles.fontFamily,
        fontSize: node.styles.fontSize,
        color: node.styles.textColor,
        textAlign: node.styles.textAlign
    };

    return (
        <div
            data-id={node.id}
            className="absolute px-2 py-4 shadow-md flex flex-col justify-center items-center cursor-pointer"
            style={wrapperStyles}
            {...handlers}
        >
            {showContent && (
                <div
                    style={textStyles}
                    className="whitespace-pre-wrap w-full h-full overflow-hidden wrap-break-word break-all"
                >
                    {node.text}
                </div>
            )}

            {children}
        </div>
    );
}
