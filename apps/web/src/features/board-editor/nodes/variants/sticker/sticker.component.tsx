import type { StickerNode } from "@repo/common";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers } from "@/features/board-editor/core";

type Props = PropsWithChildren<{
    node: StickerNode;

    handlers: NodeHandlers;

    showContent: boolean;
}>;

export function StickerComponent({ node, handlers, showContent, children }: Props) {
    const wrapperStyles: CSSProperties = {
        width: node.rect.width,
        height: node.rect.height,
        left: node.rect.x,
        top: node.rect.y,
        backgroundColor: node.styles.backgroundColor
    };

    return (
        <div
            data-id={node.id}
            className="absolute px-2 py-4 rounded-xs shadow-md flex flex-col justify-center items-center cursor-pointer"
            style={wrapperStyles}
            {...handlers}
        >
            {showContent && <div className="whitespace-pre-wrap w-full h-full overflow-hidden wrap-break-word break-all">{node.text}</div>}

            {children}
        </div>
    );
}
