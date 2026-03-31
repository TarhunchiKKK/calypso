import type { Boards } from "@repo/common";
import { ShapeVariantsIconsMap } from "@/board-editor/nodes/variants/shape/lib/shape-variants-icons.map";
import { Wrapper } from "@/shared/ui";
import { Button } from "@/shared/ui/kit";
import { AvailableShapeVariants, IconsSizes } from "./ui.constants";

type Props = {
    onSelect: (variant: Boards.ShapeVariants) => void;
};

export function ShapeSelector({ onSelect }: Props) {
    return (
        <Wrapper className="grid grid-cols-3 gap-2 p-2">
            {AvailableShapeVariants.map(variant => {
                const VariantIcon = ShapeVariantsIconsMap[variant];

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
