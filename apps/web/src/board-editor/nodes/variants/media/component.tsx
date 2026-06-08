import type { MediaNode } from "@lib/boards";
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
        top: node.rect.y
    };

    const imageStyles: CSSProperties = {
        borderRadius: node.styles.borderRadius,
        borderColor: node.styles.borderColor
    };

    return (
        <div data-id={node.id} className="absolute shadow-md cursor-pointer border" style={wrapperStyles} {...handlers}>
            <img src={node.url} alt="" className="w-full h-full overflow-hidden" style={imageStyles} />

            {children}
        </div>
    );
}
