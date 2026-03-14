import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers } from "@/board-editor/core";
import { FormatableTextarea } from "@/features/formatable-input";
import type { TextNode } from "./text-node.type";

type Props = PropsWithChildren<{
    node: TextNode;

    handlers: NodeHandlers;

    showContent: boolean;
}>;

export function TextNodeComponent({ node, handlers, showContent, children }: Props) {
    const styles: CSSProperties = {
        width: node.rect.width,
        height: node.rect.height,
        left: node.rect.x,
        top: node.rect.y
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
                    <FormatableTextarea value={node.text} disabled />
                </div>
            )}

            {children}
        </div>
    );
}
