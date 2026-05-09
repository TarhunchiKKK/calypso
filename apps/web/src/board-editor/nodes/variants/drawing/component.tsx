import type { DrawingNode } from "@repo/boards-common";
import type { CSSProperties, PropsWithChildren } from "react";
import type { NodeHandlers, NodeUiSettings } from "@/board-editor/core";
import { Drawing } from "@/entities/nodes";

type Props = PropsWithChildren<{
    node: DrawingNode;

    handlers: NodeHandlers;

    uiSettings: NodeUiSettings;
}>;

export function DrawingNodeComponent({ node, uiSettings, children }: Props) {
    const wrapperStyles: CSSProperties = {
        width: node.rect.width,
        height: node.rect.height,
        left: node.rect.x,
        top: node.rect.y
    };

    return (
        <div data-id={node.id} className="absolute" style={wrapperStyles}>
            <div className="relative w-full h-full">
                {uiSettings.showContent && <Drawing node={node} />}

                {children}
            </div>
        </div>
    );
}
