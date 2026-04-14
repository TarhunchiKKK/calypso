import type { MediaNode } from "@repo/boards-common";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers } from "@/board-editor/core";

type Props = PropsWithChildren<{
    node: MediaNode;

    handlers: NodeHandlers;
}>;

export function MediaNodeComponent({ node, handlers, children }: Props) {
    const wrapperStyles: CSSProperties = {
        width: node.rect.width,
        height: node.rect.height,
        left: node.rect.x,
        right: node.rect.y
    };

    return (
        <div data-id={node.id} className="absolute shadow-md cursor-pointer" style={wrapperStyles} {...handlers}>
            <img src={node.url} alt="" className="w-full h-full" />

            {children}
        </div>
    );
}
