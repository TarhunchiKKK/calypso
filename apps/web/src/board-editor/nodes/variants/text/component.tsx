import type { TextNode } from "@repo/boards-common";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import { FormatableTextarea } from "@/features/formatable-input";

type Props = PropsWithChildren<{
    node: TextNode;

    handlers: NodeHandlers;

    uiSettings: NodeUiSettings;
}>;

export function TextNodeComponent({ node, handlers, uiSettings, children }: Props) {
    const styles: CSSProperties = {
        width: node.rect.width,
        height: node.rect.height,
        left: node.rect.x,
        top: node.rect.y
    };

    // FIX: type casting
    return (
        <div data-id={node.id} className="absolute rounded-xs shadow-md cursor-pointer" style={styles} {...handlers}>
            <div className="relative w-full h-full px-2 py-4">
                {uiSettings.showContent && (
                    <div className="whitespace-pre-wrap w-full h-full overflow-hidden wrap-break-word break-all">
                        <FormatableTextarea value={node.text as any} disabled />
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}
