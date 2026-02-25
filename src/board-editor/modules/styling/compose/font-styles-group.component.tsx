import { ALargeSmall, CaseSensitive } from "lucide-react";
import type { NodeStyles } from "@/entities/nodes";
import { Dropdown } from "@/shared/ui";
import { FontFamilies, FontSizes } from "../constants/fonts-styling.constants";
import type { UpdateFn } from "../types";
import { StylesGroupWrapper } from "../ui/styles-group-wrapper.component";

type Props = {
    onUpdate: (fn: UpdateFn) => void;
};

export function FontStylesGroup({ onUpdate }: Props) {
    const handleFontFamilySelect = (fontFamily: NodeStyles["fontFamily"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                fontFamily
            }
        }));
    };

    const handleFontSizeSelect = (fontSize: NodeStyles["fontSize"]) => {
        onUpdate(node => ({
            ...node,
            styles: {
                ...node.styles,
                fontSize
            }
        }));
    };

    return (
        <StylesGroupWrapper>
            <Dropdown title="Font Family" placeholder={<CaseSensitive className="dark:text-white" />} items={FontFamilies} onSelect={handleFontFamilySelect} />

            <Dropdown title="Font Size" placeholder={<ALargeSmall className="dark:text-white" />} items={FontSizes} onSelect={handleFontSizeSelect} />
        </StylesGroupWrapper>
    );
}
