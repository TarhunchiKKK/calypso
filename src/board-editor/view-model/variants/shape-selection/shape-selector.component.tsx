import type { ShapeVariants } from "@/board-editor/nodes/variants/shape/shape-node.type";
import { Wrapper } from "@/shared/ui";

type Props = {
    onSelect: (variant: ShapeVariants) => void;
};

// TODO: implementation
export function ShapeSelector(_: Props) {
    return <Wrapper></Wrapper>;
}
