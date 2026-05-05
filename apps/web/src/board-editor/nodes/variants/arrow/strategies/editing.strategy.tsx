import type { ArrowNode } from "@repo/boards-common";
import type { KeyboardEventHandler } from "react";
import type { Decoratable } from "@/board-editor/core";
import { type NodeEditingHandlers, NodeEditingStrategy } from "@/board-editor/modules/editing";
import { NodeWrappersFactory } from "@/board-editor/nodes/compose/lib/node-wrappers.factory";
import { Geometry } from "@/shared/lib/geometry";
import { Textarea } from "@/shared/ui/kit";

export class ArrowEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<ArrowNode>, handlers: NodeEditingHandlers) {
        const wrapper = node.wrapper;

        if (!NodeWrappersFactory.is(wrapper, "arrow")) {
            throw new Error(`Expected arrow node but got: ${node.data}`);
        }

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newNode = {
                ...wrapper.data,
                text: e.target.value
            };

            handlers.change(newNode);
        };

        const handleKeyDown: KeyboardEventHandler = e => {
            const keyHandlers = this.getDefaultKeyHandlers(handlers);

            if (e.key in keyHandlers) {
                e.preventDefault();
                keyHandlers[e.key]();
            }
        };

        const position = Geometry.middlePoint(wrapper.absolutePosition.start, wrapper.absolutePosition.end);

        return (
            <Textarea
                value={wrapper.data.text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{ left: position.x, top: position.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
            />
        );
    }
}
