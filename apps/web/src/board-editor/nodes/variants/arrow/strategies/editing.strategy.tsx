import type { ArrowNode } from "@lib/boards";
import type { KeyboardEventHandler } from "react";
import type { Decoratable } from "@/board-editor/core";
import { isResolvedArrow } from "@/board-editor/modules/arrows-resolution";
import { type NodeEditingHandlers, NodeEditingStrategy } from "@/board-editor/modules/editing";
import { Geometry } from "@/shared/lib/geometry";
import { Textarea } from "@/shared/ui/kit";

export class ArrowEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<ArrowNode>, handlers: NodeEditingHandlers) {
        if (!isResolvedArrow(node.data)) {
            throw new Error(`Arrow not resolved: ${node.data}`);
        }

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newNode = {
                ...node.data,
                text: e.target.value
            };

            handlers.change(newNode);
        };

        const handleKeyDown: KeyboardEventHandler = (e) => {
            const keyHandlers = this.getDefaultKeyHandlers(handlers);

            if (e.key in keyHandlers) {
                e.preventDefault();
                keyHandlers[e.key]();
            }
        };

        const position = Geometry.middlePoint(node.data.absolutePosition.start, node.data.absolutePosition.end);

        return (
            <Textarea
                value={node.data.text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{ left: position.x, top: position.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
            />
        );
    }
}
