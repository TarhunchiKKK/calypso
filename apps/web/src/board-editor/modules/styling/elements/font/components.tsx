import type { NodeStyles } from "@repo/boards";
import { Dropdown } from "@/shared/ui";
import type { ElementProps } from "../../lib/types";
import { FontFamilies, FontFamilyPlaceholder, FontSizePlaceholder, FontSizes } from "./constants";

export function FontFamily({ update }: ElementProps) {
    const handleSelect = (fontFamily: NodeStyles["fontFamily"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                fontFamily
            }
        }));
    };

    return <Dropdown title="Font Family" placeholder={FontFamilyPlaceholder} items={FontFamilies} onSelect={handleSelect} />;
}

export function FontSize({ update }: ElementProps) {
    const handleSelect = (fontSize: NodeStyles["fontSize"]) => {
        update((node) => ({
            ...node,
            styles: {
                ...node.styles,
                fontSize
            }
        }));
    };

    return <Dropdown title="Font Size" placeholder={FontSizePlaceholder} items={FontSizes} onSelect={handleSelect} />;
}
