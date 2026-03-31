import type { Boards } from "@repo/common";
import { BindingPoints, NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";

const positions = {
    n: true,
    s: true,
    w: true,
    e: true,
    nw: true,
    ne: true,
    sw: true,
    se: true
};

export class StickerBindingStrategy extends NodeBindingStrategy<Boards.StickerNode> {
    public override ui() {
        return <BindingPoints positions={positions} />;
    }
}
