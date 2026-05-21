import type { NodeStyles } from "@repo/boards";
import { Dropdown } from "@/shared/ui";
import type { ElementProps } from "../../lib/types";
import { FontFamilyPlaceholder, FontSizePlaceholder, getFontFamilies, getFontSizes } from "./constants";

export function FontFamily({ values, update }: ElementProps<"fontFamily">) {
    const fontFamilies = getFontFamilies(values);

    const handleSelect = (fontFamily: NodeStyles["fontFamily"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                fontFamily
            }
        }));
    };

    return <Dropdown title="Font Family" placeholder={FontFamilyPlaceholder} items={fontFamilies} onSelect={handleSelect} />;
}

export function FontSize({ values, update }: ElementProps<"fontSize">) {
    const fontSizes = getFontSizes(values);

    const handleSelect = (fontSize: NodeStyles["fontSize"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                fontSize
            }
        }));
    };

    return <Dropdown title="Font Size" placeholder={FontSizePlaceholder} items={fontSizes} onSelect={handleSelect} />;
}
