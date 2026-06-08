import type { TextNode } from "@lib/boards";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import { FormattableText } from "@/features/formattable-input";

type Props = PropsWithChildren<{
    node: TextNode;

    handlers: NodeHandlers;

    uiSettings: NodeUiSettings;
}>;

export function TextNodeComponent({ node, handlers, uiSettings, children }: Props) {
    const wrapperStyles: CSSProperties = {
        width: node.rect.width,
        left: node.rect.x,
        top: node.rect.y
    };

    return (
        <div data-id={node.id} className="absolute rounded-xs cursor-pointer" style={wrapperStyles} {...handlers}>
            <div className="relative w-full h-full px-2 py-4">
                {uiSettings.showContent && <FormattableText value={node.content} disabled={node.locked} className="pointer-events-none" />}

                {children}
            </div>
        </div>
    );
}
