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
        top: node.rect.y
    };

    const iconStyles = {
        fill: node.styles.backgroundColor,
        color: node.styles.borderColor
    };

    const ShapeToRender = ShapeVariantIconsMap[node.variant];

    return (
        <div data-id={node.id} className="absolute cursor-pointer" style={wrapperStyles} {...handlers}>
            <ShapeToRender className="w-full h-full" {...iconStyles} />

            {children}
        </div>
    );
}
