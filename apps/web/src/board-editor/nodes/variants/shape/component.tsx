import type { ShapeNode } from "@lib/boards";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers } from "@/board-editor/core";
import { ShapeVariantsMap } from "./lib/shape-variants.map";

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

    const renderShape = ShapeVariantsMap[node.variant];

    return (
        <div data-id={node.id} className="absolute cursor-pointer" style={wrapperStyles} {...handlers}>
            <svg className="w-full h-full pointer-events-none overflow-visible" {...handlers}>
                {renderShape(node, handlers)}
            </svg>

            {children}
        </div>
    );
}
