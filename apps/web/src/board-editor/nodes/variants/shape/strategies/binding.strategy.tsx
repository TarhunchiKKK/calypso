import type { Boards } from "@repo/common";
import { BindingPoints, NodeBindingStrategy } from "@/board-editor/modules/arrows-binding";

const shapeVariantPositions = {
    rectangle: {
        n: true,
        s: true,
        w: true,
        e: true,
        nw: true,
        ne: true,
        sw: true,
        se: true
    },
    circle: {
        n: true,
        s: true,
        w: true,
        e: true
    },
    diamond: {
        n: true,
        s: true,
        w: true,
        e: true
    },
    triangle: {
        n: true,
        sw: true,
        se: true
    },
    hexagon: {
        n: true,
        s: true,
        "wn-mid": true,
        "ws-mid": true,
        "en-mid": true,
        "es-mid": true
    },
    star: {
        n: true,
        w: true,
        e: true,
        "wn-mid": true,
        "en-mid": true,
        "sw-mid": true,
        "se-mid": true
    }
} satisfies Record<Boards.ShapeVariants, unknown>;

export class ShapeBindingStrategy extends NodeBindingStrategy<Boards.ShapeNode> {
    public override ui() {
        const positions = shapeVariantPositions[this.node.variant];

        return <BindingPoints positions={positions} />;
    }
}
