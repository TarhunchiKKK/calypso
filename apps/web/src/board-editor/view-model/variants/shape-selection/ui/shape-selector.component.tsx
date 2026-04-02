import type { ShapeVariants } from "@repo/boards-common";
import { Wrapper } from "@/shared/ui";
import { Button } from "@/shared/ui/kit";
import { IconsSizes, ShapeVariantsIconsMap } from "./ui.constants";

type Props = {
    onSelect: (variant: ShapeVariants) => void;
};

export function ShapeSelector({ onSelect }: Props) {
    return (
        <Wrapper className="grid grid-cols-3 gap-2 p-2">
            {(Object.keys(ShapeVariantsIconsMap) as ShapeVariants[]).map(variant => {
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
