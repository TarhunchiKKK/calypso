import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers } from "@/board-editor/core";
import type { ShapeNode } from "./shape-node.type";
import { ShapeVariantIconsMap } from "./ui.constants";

type Props = PropsWithChildren<{
    node: ShapeNode;

    handlers: NodeHandlers;
}>;

export function ShapeNodeComponent({ node, handlers, children }: Props) {
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

    const shape = ShapeVariantIconsMap[node.variant];

    return (
        <div data-id={node.id} className="absolute px-2 py-4 shadow-md cursor-pointer" style={wrapperStyles} {...handlers}>
            {shape}

            {children}
        </div>
    );
}
