import type { ShapeVariants } from "@/board-editor/nodes/variants/shape/shape-node.type";
import { ShapeVariantIconsMap } from "@/board-editor/nodes/variants/shape/ui.constants";
import { Wrapper } from "@/shared/ui";
import { Button } from "@/shared/ui/kit";
import { AvailableShapeVariants, IconsSizes } from "./ui.constants";

type Props = {
    onSelect: (variant: ShapeVariants) => void;
};

export function ShapeSelector({ onSelect }: Props) {
    return (
        <Wrapper className="grid grid-cols-3 gap-2 p-2">
            {AvailableShapeVariants.map(variant => {
                const VariantIcon = ShapeVariantIconsMap[variant];

                return (
                    <Button
                        key={variant}
                        variant="outline"
                        size="icon-lg"
                        className="cursor-pointer p-1"
                        onClick={onSelect.bind(null, variant)}
                    >
                        <VariantIcon style={IconsSizes} />
                    </Button>
                );
            })}
        </Wrapper>
    );
}
