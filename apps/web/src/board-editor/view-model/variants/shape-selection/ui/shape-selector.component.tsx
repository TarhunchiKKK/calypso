import type { Boards } from "@repo/common";
import { Wrapper } from "@/shared/ui";
import { Button } from "@/shared/ui/kit";
import { IconsSizes, ShapeVariantsIconsMap } from "./ui.constants";

type Props = {
    onSelect: (variant: Boards.ShapeVariants) => void;
};

export function ShapeSelector({ onSelect }: Props) {
    return (
        <Wrapper className="grid grid-cols-3 gap-2 p-2">
            {(Object.keys(ShapeVariantsIconsMap) as Boards.ShapeVariants[]).map(variant => {
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
