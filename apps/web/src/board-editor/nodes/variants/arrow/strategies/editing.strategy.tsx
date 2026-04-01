import type { Boards } from "@repo/common";
import type { Decoratable } from "@/board-editor/core";
import { NodeEditingStrategy } from "@/board-editor/modules/editing";
import { Geometry } from "@/shared/lib/geometry";
import { Textarea } from "@/shared/ui/kit";
import type { ArrowNodeWrapper } from "../arrow-node.wrapper";

export class ArrowEditingStrategy extends NodeEditingStrategy {
    public override ui(node: Decoratable<Boards.ArrowNode>) {
        const wrapper = node.wrapper as ArrowNodeWrapper;

        const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newNode = {
                ...wrapper.data,
                text: e.target.value
            };

            this.handler(newNode);
        };

        const position = Geometry.middlePoint(wrapper.absolutePosition.start, wrapper.absolutePosition.end);

        return (
            <Textarea
                value={wrapper.data.text}
                onChange={onChange}
                style={{ left: position.x, top: position.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
            />
        );
    }
}
