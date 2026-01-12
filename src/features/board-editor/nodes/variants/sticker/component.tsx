import { CSSProperties, PropsWithChildren } from "react";
import { StickerNode } from "./type";
import { NodeHandlers } from "@/features/board-editor/core";

type Props = PropsWithChildren<{
    node: StickerNode;

    handlers: NodeHandlers;

    showContent: boolean;
}>;

export function StickerComponent({ node, handlers, showContent, children }: Props) {
    const styles: CSSProperties = {
        width: node.width,
        height: node.height,
        left: node.x,
        top: node.y
    };

    return (
        <div
            data-id={node.id}
            className="absolute bg-yellow-300 px-2 py-4 rounded-xs shadow-md flex flex-col justify-center items-center cursor-pointer"
            style={styles}
            {...handlers}
        >
            {showContent && (
                <div className="whitespace-pre-wrap w-full h-full overflow-hidden wrap-break-word break-all">
                    {node.text}
                </div>
            )}

            {children}
        </div>
    );
}
